import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

const Order = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Order</span>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
          Order List
          </p>
        </Colxx>
      </Row>
    </>
  );
};

export default Order;
