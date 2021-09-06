import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, CardTitle, Table, Button } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getUserRolesAPI} from '../../../constants/defaultValues';
import axios from 'axios';


const RoleMaster = ({ match }) => {
  //user roles state
  const [userRolesList,setUserRolesList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    getUserRolesAPICall();
  },[])

  //API CALLS
  const getUserRolesAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getUserRolesAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
         setUserRolesList(responseData.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Role</span>
            <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-5">

        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>

              <Table responsive bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Role Name</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="2"><div className="custom-list-loading" /></td>
                  </tr> : 
                  userRolesList.length > 0 ?
                    userRolesList.map((item,index)=>
                      <tr key={index}>
                        <th scope="row">{index +1}</th>
                        <td>{item.name}</td>
                      </tr>
                    ):<tr>
                        <td className="text-center text-danger" colSpan="2">Data  Not  Found</td>
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
export default RoleMaster;
