import React from 'react';
import { 
  Row, Card, CardBody, FormGroup,Label, Input, CustomInput, Button
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

const AddRole = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Role</span>
            <a href="Role" className="mt-2 btn-primary default btn-sm tbl_action_btn float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Role List</b>
            </a>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
              <CardBody> 
                  <Row>
                    <Colxx sm={12}>
                      <FormGroup>
                        <Label>
                          Role Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="Role Name"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <CustomInput
                          type="checkbox"
                          label="Role Create"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <CustomInput
                          type="checkbox"
                          label="Role Update"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <CustomInput
                          type="checkbox"
                          label="User List"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <CustomInput
                          type="checkbox"
                          label="Report Permission"
                        />
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx sm="12" className="text-center">
                      <Button color="primary" className="default mr-2">
                          <b>Add</b>
                      </Button>
                      <Button color="light" className="default">
                          <b>Cancel</b>
                      </Button>
                    </Colxx>
                  </Row>
              </CardBody>
              </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default AddRole;
