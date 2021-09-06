import React,{useState,useEffect} from 'react';
import { 
  Row, Card, CardBody,CardSubtitle, Table, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Modal,
  ModalHeader,
  Input,InputGroup
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getChargerInventoryListAPI,deleteChargerInventoryAPI, adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';


const Charger = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //battery list
  const [chargerInventoryList,setChargerInventoryList] = useState([]);
  const [chargerInventoryID,setChargerInventoryID] = useState("");
  const [chargerInventoryToDeleteId,setChargerInventoryToDeleteId] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getChargerInventoryListAPICall();
    chargerInventoryAlert();
  },[chargerInventoryID,pageCount])

  //API calls
  const getChargerInventoryListAPICall = async() => {
    setChargerInventoryList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getChargerInventoryListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setChargerInventoryList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

  const deleteChargerInventoryAPICall = async(chargerInventoryId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteChargerInventoryAPI,
      {charger_inventory_id:chargerInventoryId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setChargerInventoryID(chargerInventoryId);
          chargerInventoryDeletedAlert(responseData.status,responseData.msg)
        }else{
          chargerInventoryDeletedAlert(responseData.status,responseData.msg)
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //Helper methods
  const updateChargerInventory = (chargerInventoryId) => {
    history.push({
      pathname:adminRoot+'/inventory/updatecharger_inventory',
      state:{charger_inventory_id:chargerInventoryId}
    });
  }
  //pagination methods
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
  const chargerInventoryDeletedAlert = (status,msg)=>{
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
  const chargerInventoryAlert = () =>{
    if (location.state === null || location.state === undefined) {
      return;
    }else{
      if (location.state.responseStatus === 1) {
        setAlertVisible(true);
        setAlertMsg(location.state.responseMsg);
        setAlertColor("success");
        history.replace({
          state: null,
        })
      }else{
        setAlertVisible(true);
        setAlertMsg(location.state.responseMsg);
        setAlertColor("danger");
        history.replace({
          state: null,
        })
      }
    }
  }
  //Modal helper methods
  const toggleModal = (chargerInventoryId) => {
    setChargerInventoryToDeleteId(chargerInventoryId)
    setModalVisible(!modalVisible);
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getChargerInventoryListAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Charger Inventory</span>
          <a href="addcharger" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-plus"></i> Add New</b>
            </a>
          <Separator className="mb-5 mt-1" />
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
      <Row>
        <Colxx xxs="12" className="mb-4">
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
                      <th>CID</th>
                      <th>QR Code</th>
                      <th>Owned By</th>
                      <th>Make</th>
                      <th>Model Name</th>
                      <th>Hub</th>
                      <th>No. of slots</th>
                      <th>Dimensions</th>
                      <th>Remark 1</th>
                      <th>Remark 2</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="12"><div className="custom-list-loading" /></td>
                      </tr> : 
                        chargerInventoryList.length > 0 ?
                        chargerInventoryList.map((item,index)=>
                        <tr key={item.id}>
                          <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                          <td>{item.charger_id}</td>
                          <td>{item.qr_code}</td>
                          <td>{item.owner_name}</td>
                          <td>{item.make}</td>
                          <td>{item.model}</td>
                          <td>{item.station_name}</td>
                          <td>{item.no_of_slot}</td>
                          <td>{item.dimension}</td>
                          <td>{item.remark_1}</td>
                          <td>{item.remark_2}</td>
                          <td>
                            <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updateChargerInventory(item.id)}}>
                                <i className="glyph-icon simple-icon-pencil text-white"></i>
                            </a>
                            <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.id)}}>
                                <i className="glyph-icon simple-icon-trash"></i>
                            </Button>                        
                          </td>
                        </tr>
                      ):<tr>
                          <td className="text-center text-danger" colSpan="12">Data  Not  Found</td>
                        </tr>
                    }          
                  </tbody>
                </Table>
                <Modal
                  isOpen={modalVisible}
                  toggle={toggleModal} >
                  <ModalHeader className="text-center">
                    Are you sure you would like to delete this inventory?
                    <Button color="success" className="mt-4" onClick={()=>deleteChargerInventoryAPICall(chargerInventoryToDeleteId)}>
                      Delete Inventory 
                    </Button>{' '}
                    <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                      Cancel
                    </Button>
                  </ModalHeader>
                </Modal>
              </CardBody>
            </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Charger;
