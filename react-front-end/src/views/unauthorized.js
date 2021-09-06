import React, { useEffect } from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../components/common/CustomBootstrap';
import IntlMessages from '../helpers/IntlMessages';
import { adminRoot } from '../constants/defaultValues'
import cz_logo from '../assets/img/logo/charge_zonelogo1.png';
import { getCurrentUser } from '../helpers/Utils';
const Unauthorized = () => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);
  const currentUser = getCurrentUser();
  const current_role = currentUser.user_detail.roles[0];
  let home_url = (current_role===1)?"operator":((current_role===4)?"manager":"admin");
  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
              <div className="position-relative image-side text-center">
                    <p className="text-white h2">Transportation is transforming and we need to get ready</p>
                    <p className="white mb-0">
                      Please use your credentials to login.
                      <br />
                    </p>
                  </div>
                <div className="form-side">
                  <NavLink to="/" className="white">
                    <img src={cz_logo} alt="Chargezone_logo" className="cz_logo" />
                  </NavLink>
                  <CardTitle className="mb-4">
                    <IntlMessages id="unauthorized.title" />
                  </CardTitle>
                  <p className="mb-0 text-muted text-small mb-0">
                    <IntlMessages id="unauthorized.detail" />
                  </p>
                  <p className="display-1 font-weight-bold mb-5">503</p>
                  <NavLink to={adminRoot+'/dashboard/'+home_url} className="btn btn-primary btn-shadow btn-lg">
                    <IntlMessages id="pages.go-back-home" />
                  </NavLink>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Unauthorized;
