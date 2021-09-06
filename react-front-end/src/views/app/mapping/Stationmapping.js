import React,{useState,useEffect} from 'react';
import { Row, Card, CardBody, CardSubtitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Table, Button,
  Input,InputGroup 
} from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getSwappingStationAPI, adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Stationmapping = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //station list
  const [stationList,setStationList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  useEffect(()=>{
    getSwappingStationListAPI();
  },[pageCount])

  //API calls
  const getSwappingStationListAPI = async() => {
    setStationList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getSwappingStationAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setStationList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

   //Helper methods
   const mapStation = (hubId) => {
    history.push({
      pathname:adminRoot+'/mapping/stationmapping',
      state:{hub_id:hubId}
    });
  }

  const renderPageList = () => {
    const pageNumbers = [];
    for (let i = 0; i <lastPageCount; i += 1) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={() => {setPageCount(i+1)}}>
          {i+1}
        </DropdownItem>
      );
    }
    return pageNumbers;
  };
  //Alert helper methods
  const stationAlert = (status,msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    if (status === 1) {
      setAlertColor("success");
    } else {
      setAlertColor("danger");
    }
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getSwappingStationListAPI();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Station</span>
            <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="4">
          <div className="ml-2 mb-2">
            <InputGroup>
            <Input 
            type="text" 
            placeholder="Search"
            value={searchBy}
            onChange={e=>setSearchBy(e.target.value)}/>
            <Button className="default search-icon" color="primary" outline onClick={()=>handleSearch()}><i className="glyph-icon simple-icon-magnifier"></i></Button>
            </InputGroup>  
          </div>
        </Colxx>
        <Colxx md="8">
            <div className="text-right mr-5 mb-2">
              <span>Page </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs" data-display="static">
                  {pageCount}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                  {renderPageList()}
                </DropdownMenu>
              </UncontrolledDropdown>
              <span> of </span>
              {lastPageCount}
            </div>
        </Colxx>
      </Row>
      <Row className="mb-5">
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardSubtitle className="mb-3">
                  <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                    {alertMsg}
                  </Alert>
              </CardSubtitle>
              <Table responsive bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>EV Capacity</th>
                    <th>Address</th>
                    <th>Remark1</th>
                    <th>Remark2</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="8"><div className="custom-list-loading" /></td>
                  </tr> : 
                  (stationList.length>0)?
                      stationList.map((item,index)=>
                      <tr key={item.hub_master_id}>
                      <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                      <td>{item.name}</td>
                      <td>{item.ev_capacity}</td>
                      <td>{item.address}</td>
                      <td>{item.remark_1}</td>
                      <td>{item.remark_2}</td>
                      <td>
                      <Button color="primary" className="btn-primary default mr-1 btn-sm tbl_action_a" onClick={()=>mapStation(item.hub_master_id)}>
                            <b><i className="glyph-icon iconsminds-repeat-2"></i> Map</b>
                      </Button>
                      </td>
                    </tr>
                    )
                    :<tr>
                        <td className="text-center text-danger" colSpan="8">Data  Not  Found</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default Stationmapping;
