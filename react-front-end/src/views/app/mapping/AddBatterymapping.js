import React from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

const AddBatterymapping = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Battery Mapping</span>
            <a href="batterymapping" className="mt-2 btn-primary default btn-sm tbl_action_btn float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Battery Mapping List</b>
            </a>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
                <Row>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                      Swapping Station
                      </Label>
                      <Input type="select">
                        <option>Select</option>
                        <option>station1</option>
                        <option>station2</option>
                        <option>station3</option>
                      </Input>
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                      <FormGroup>
                        <Label>
                        Remark1
                        </Label>
                        <Input
                          type="text"
                          placeholder="Remark1"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label>
                          Remark2
                        </Label>
                        <Input
                          type="text"
                          placeholder="Remark2"
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

export default AddBatterymapping;
