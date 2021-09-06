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
import {adminRoot, getOwnerListAPI,deleteOwnerAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';


const OwnerMaster = () => {
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
  const [ownerList,setOwnerList] = useState([]);
  const [ownerID,setOwnerID] = useState("");
  const [ownerToDeleleteId,setOwnerToDeleleteId] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getOwnerListAPICall();
    ownerAlert();
  },[pageCount,ownerID])

  //API CALLS
  const getOwnerListAPICall = async() => {
    setOwnerList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getOwnerListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setOwnerList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  const deleteOwnerAPICall = async(ownerId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteOwnerAPI,
      {owner_master_id:ownerId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setOwnerID(ownerId);
          ownerDeletedAlert(responseData.status,responseData.msg)
        }else{
          console.log(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //helper methods
  const updateOwner = (ownerId) => {
    history.push({
      pathname:adminRoot+'/pages/updateowner',
      state:{owner_master_id:ownerId}
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
  const ownerDeletedAlert = (status,msg)=>{
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
  const ownerAlert = () =>{
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
  const toggleModal = (userId) => {
    setOwnerToDeleleteId(userId)
    setModalVisible(!modalVisible);
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getOwnerListAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Owner</span>
            <a href="addowner" className="mt-2 btn-primary default btn-sm float-right">
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
                    <th>Owner Name</th>
                    <th>Contact Number</th>
                    <th>Contact Email</th>
                    <th>Address</th>                    
                    <th>Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="7"><div className="custom-list-loading" /></td>
                  </tr> : 
                    ownerList.length > 0 ?
                    ownerList.map((item,index)=>
                      <tr key={index}>
                        <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index+1}</th>
                        <td>{item.name}</td>
                        <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).contact_number:""}</td>
                        <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).contact_email:""}</td>
                        <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).address:""}</td>
                        <td>{item.remark}</td>
                        <td>
                            <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updateOwner(item.owner_master_id)}}>
                                <i className="glyph-icon simple-icon-pencil text-white"></i>
                            </a>
                            <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.owner_master_id)}}>
                                <i className="glyph-icon simple-icon-trash"></i>
                            </Button>
                        </td>
                      </tr>
                    ):<tr>
                        <td className="text-center text-danger" colSpan="7">Data  Not  Found</td>
                    </tr>
                }
                </tbody>
              </Table>
              <Modal
                isOpen={modalVisible}
                toggle={toggleModal} >
                <ModalHeader className="text-center">
                  Are you sure you would like to delete this owner?
                  <Button color="success" className="mt-4" onClick={()=>{deleteOwnerAPICall(ownerToDeleleteId)}}>
                    Delete Owner
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
export default OwnerMaster;
