import React,{useState,useEffect} from 'react';
import { Row, Card, CardBody, CardSubtitle, Table, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Modal,
  ModalHeader,
  Input,InputGroup
 } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {adminRoot, getFaultListAPI,deleteFaultAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';


const FaultMaster = () => {
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
  //user states
  const [faultList,setFaultList] = useState([]);
  const [faultID,setFaultID] = useState("");
  const [faultToDeleleteId,setFaultToDeleleteId] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getFaultListAPICall();
    faultAlert();
  },[pageCount,faultID])

  //API CALLS
  const getFaultListAPICall = async() => {
    setFaultList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getFaultListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setFaultList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

  const deleteFaultAPICall = async(faultId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteFaultAPI,
      {fault_master_id:faultId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setFaultID(faultId);
          faultDeletedAlert(responseData.status,responseData.msg)
        }else{
          console.log(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //helper methods
  const updateFault = (faultId) => {
    history.push({
      pathname:adminRoot+'/pages/updatefault',
      state:{fault_master_id:faultId}
    });
  }
  //pagination method
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
  //ALert helper methods
  const faultDeletedAlert = (status,msg)=>{
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
  const faultAlert = () =>{
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
  const toggleModal = (faultId) => {
    setFaultToDeleleteId(faultId)
    setModalVisible(!modalVisible);
  }
    //handle search input
    const handleSearch = () => {
        setPageCount(1);
        getFaultListAPICall();
    }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Fault</span>
            <a href="addfault" className="mt-2 btn-primary default btn-sm float-right">
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
                    <th>Type</th>
                    <th>OEM</th>
                    <th>Position</th>
                    <th>Fault title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="6"><div className="custom-list-loading" /></td>
                  </tr> : 
                  faultList.length > 0 ?
                    faultList.map((item,index)=>
                      <tr key={index}>
                        <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index+1}</th>
                        <td>{item.type===1?"Battery":item.type ===2?"EV":item.type ===3?"Charger":"Connector"}</td>
                        <td>{item.oem_name}</td>
                        <td>{item.bit_position}</td>
                        <td>{item.title}</td>
                        <td>
                            <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updateFault(item.id)}}>
                                <i className="glyph-icon simple-icon-pencil text-white"></i>
                            </a>
                            <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.id)}}>
                                <i className="glyph-icon simple-icon-trash"></i>
                            </Button>
                        </td>
                      </tr>
                    ):<tr>
                        <td className="text-center text-danger" colSpan="6">Data  Not  Found</td>
                    </tr>
                }   
                </tbody>
              </Table>
              <Modal
                isOpen={modalVisible}
                toggle={toggleModal} >
                <ModalHeader className="text-center">
                  Are you sure you would like to delete this fault?
                  <Button color="success" className="mt-4" onClick={()=>{deleteFaultAPICall(faultToDeleleteId)}}>
                    Delete Fault
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
export default FaultMaster;
