import React, { createRef, useState } from 'react';
import { Row, Button, Col, Card, CardBody, FormGroup, Label, Spinner, Alert } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from '../../../helpers/IntlMessages';
import BottomNavigation from '../../../components/wizard/BottomNavigation';
import TopNavigation from '../../../components/wizard/TopNavigation';
import { validateOTPAPI, validateScanEVAPI, validateScanBatteryAPI, validatePairEVAPI } from "../../../constants/defaultValues"
import { getCurrentUser } from '../../../helpers/Utils'
import axios from 'axios';
import { NotificationManager } from '../../../components/common/react-notifications';
import QrReader from 'react-qr-reader'
import { adminRoot } from "../../../constants/defaultValues"



const Start = ({ match, intl }) => {
  const forms = [createRef(null), createRef(null), createRef(null), createRef(null), createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [bottomNavHidden1, setBottomNavHidden1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [QR1, setQR1] = useState(false);
  const [QR2, setQR2] = useState(false);
  const [QR3, setQR3] = useState(false);
  const [QR4, setQR4] = useState(false);
  const [QR5, setQR5] = useState(false);
  const [QR6, setQR6] = useState(false);
  const [_otp, setOTPStart] = useState('');

  const [qrscan_val1, setqrscan_val1] = useState('');
  const [qrscan_val2, setqrscan_val2] = useState('');
  const [qrscan_val3, setqrscan_val3] = useState('');
  const [qrscan_otp, setqrscan_otp] = useState('');
  const [qrscan_val4, setqrscan_val4] = useState('');
  const [qrscan_val5, setqrscan_val5] = useState('');
  const [qrscan_val6, setqrscan_val6] = useState('');

  const handleScanQR1 = (resp) => { if (resp) { setqrscan_val1(resp); setQR1(false); } };
  const handleScanQR2 = (resp) => { if (resp) { resp = resp.replace(/\D/g, ''); setqrscan_val2(resp); setQR2(false); } };
  const handleScanQR3 = (resp) => { if (resp) { resp = resp.replace(/\D/g, ''); setqrscan_val3(resp); setQR3(false); } };
  const handleScanQR4 = (resp) => { if (resp) { setqrscan_val4(resp); setQR4(false); } };
  const handleScanQR5 = (resp) => { if (resp) { resp = resp.replace(/\D/g, ''); setqrscan_val5(resp); setQR5(false); } };
  const handleScanQR6 = (resp) => { if (resp) { resp = resp.replace(/\D/g, ''); setqrscan_val6(resp); setQR6(false); } };

  const btnScanQR1 = (e) => { setQR1(!QR1); };
  const btnScanQR2 = (e) => { setQR2(!QR2); };
  const btnScanQR3 = (e) => { setQR3(!QR3); };
  const btnScanQR4 = (e) => { setQR4(!QR4); };
  const btnScanQR5 = (e) => { setQR5(!QR5); };
  const btnScanQR6 = (e) => { setQR6(!QR6); };

  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'scanev1',
      val_id: 'qrscan_val1',
      value: '',
    },
    {
      valid: false,
      name: 'discharge_bt1',
      val_id: 'qrscan_val2',
      value: '',
    },
    {
      valid: false,
      name: 'discharge_bt2',
      val_id: 'qrscan_val3',
      value: '',
    },
    {
      valid: false,
      name: 'otp',
      val_id: 'qrscan_otp',
      value: '',
    },
    {
      valid: false,
      name: 'scanev',
      val_id: 'qrscan_val4',
      value: '',
    },
    {
      valid: false,
      name: 'charge_bt1',
      val_id: 'qrscan_val5',
      value: '',
    },
    {
      valid: false,
      name: 'charge_bt2',
      val_id: 'qrscan_val6',
      value: '',
    },
  ]);

  const bevTokenData = {
    "success": null,
    "successMessage": null,
    "errorMessage": null,
    "authToken": null,
    "validity": null
  };

  const driveVerifyDetail = {
    "url": null,
    "userid": null,
    "password": null,
    "eligible_url": null
  };
  const createNotification = (text) => {
    NotificationManager.error(
      text,
      'Error!',
      5000,
      () => {
        // alert('callback');
      },
      null,
      "error filled"
    );
  };
  const createNotificationInfo = (text) => {
    NotificationManager.info(
      text,
      'Info!',
      5000,
      () => {
        // alert('callback');
      },
      null
    );
  };
  const validateOTP = () => {
    let value = qrscan_otp;
    let error = null;
    if (!value) {
      error = 'Please enter your start OTP';
      // } else if (!/^[0-9]{4}$/.test(value)) {
    } else if (value != '1234') {
      error = 'Invalid OTP. Please Enter valid OTP';
    }
    setOTPStart(value);
    return error;
  };
  const validateScanEV = (value) => {
    let error;
    if (!qrscan_val4) {
      error = 'Please enter your text';
    }
    return error;
  };
  const validateScanEV1 = (value) => {
    let error;
    if (!qrscan_val1) {
      error = 'Please enter your text';
    }
    return error;
  };
  const validatedischarge_bt1 = (value) => {
    let error;
    if (!qrscan_val2) {
      error = 'Please enter your text';
    }

    return error;
  };

  const validatedischarge_bt2 = (value) => {
    let error;
    if (!qrscan_val3) {
      error = 'Please enter Discharged Battery ID';
    }
    return error;
  };
  const validatecharge_bt1 = (value) => {
    let error;
    if (!qrscan_val5) {
      error = 'Please enter your text';
    }
    return error;
  };
  const validatecharge_bt2 = (value) => {
    let error;
    if (!qrscan_val6) {
      error = 'Please enter your text';
    }
    return error;
  };

  const asyncLoading = (extraIndex) => {

    if (extraIndex == 0) {
      setLoading(true);
      setBottomNavHidden(true);
    } else {
      setLoading1(true);
      setBottomNavHidden1(true);
    }
  };

  const stopAsyncLoading = (extraIndex) => {
    if (extraIndex == 0) {
      setLoading(false);
      setBottomNavHidden(false);
    } else {
      setLoading1(false);
      setBottomNavHidden1(false);
    }
  };


  const onClickNext = async (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const extraIndex = (steps.length == 5) ? 3 : 0;
    const formIndex = extraIndex + steps.indexOf(step);


    const form = forms[formIndex].current;
    const { name, val_id } = fields[formIndex];
    form.submitForm().then(() => {
      const newFields = [...fields];

      newFields[formIndex].value = form.values[name];
      newFields[formIndex].valid = !form.errors[name];
      setFields(newFields);

      // if (!form.errors[name] && form.touched[name] ) {
      if (eval(val_id).trim() != "") {
        asyncLoading(extraIndex);

        switch (step.id) {
          case 'step1':
            validateScanEVAPICall({ scanevVal: qrscan_val1 })
              .then((res) => {
                if (res.data.status === 1) {
                  goToNext();
                  step.isDone = true;
                } else
                  createNotification(res.data.msg);
                stopAsyncLoading(extraIndex);

              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);

              });
            return;
          case 'step2':
            validateScanBatteryAPICall({ batterytype: "Discharged", battery_sq: "1", batteryqrval: qrscan_val2, scanevVal: qrscan_val1 })
              .then((res) => {
                if (res.data.status === 1) {
                  goToNext();
                  step.isDone = true;
                } else
                  createNotification(res.data.msg);
                stopAsyncLoading(extraIndex);
              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);
              });
            return;
          case 'step3':
            validateScanBatteryAPICall({ batterytype: "Discharged", battery_sq: "2", batteryqrval: qrscan_val3, scanevVal: qrscan_val1 })
              .then((res) => {
                if (res.data.status === 1) {
                  goToNext();
                  step.isDone = true;
                } else
                  createNotification(res.data.msg);
                stopAsyncLoading(extraIndex);
              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);

              });
            return;
          case 'step4':
            let error = validateOTP();
            if (error == null) {
              goToNext();
              step.isDone = true;
              stopAsyncLoading(extraIndex);
            } else {
              createNotification(error);
            }
            // validateStartOTPAPI({ otp: form.values[name] })
            //   .then((res) => {
            //     if (res.data.status === 1) {
            //       goToNext();
            //       step.isDone = true;
            //     } else
            //       createNotification(res.data.msg);
            //     stopAsyncLoading(extraIndex);
            //   }).catch(error => {
            //     createNotification("something went wrong");
            //     stopAsyncLoading(extraIndex);
            //   });
            return;
          case 'step5':
            debugger
            validatePairEVAPICall({ otp: _otp, ev_qr_code: qrscan_val4 })
              .then(async (respair) => {
                debugger
                if (respair.data.status === 1) {
                  if (respair.data.data && respair.data.data.driver_verify_require === 1) {
                    createNotificationInfo("Two factor authentication check for EV");
                    driveVerifyDetail.url = respair.data.data.driver_verify_url;
                    driveVerifyDetail.userid = respair.data.data.driver_verify_user;
                    driveVerifyDetail.password = respair.data.data.driver_verify_pass;
                    driveVerifyDetail.eligible_url = respair.data.data.driver_verify_eligible_url;
                    debugger;

                    let driveToken = await BevAuthToekn();
                    bevTokenData.success = driveToken.data.success;
                    bevTokenData.errorMessage = driveToken.data.errorMessage;
                    bevTokenData.validity = null;
                    if (driveToken.data.success) {
                      bevTokenData.authToken = driveToken.data.authToken;
                      bevTokenData.successMessage = driveToken.data.successMessage;
                      bevTokenData.validity = driveToken.data.validity;

                      let resdriver = await DriveEligibility();
                      if (resdriver.data.success) {
                        if (resdriver.data.status === 1) {
                          goToNext();
                          step.isDone = true;
                          stopAsyncLoading(extraIndex);
                        }
                        else {
                          createNotification(resdriver.data.successMessage);
                          stopAsyncLoading(extraIndex);
                        }
                      } else {
                        createNotification(resdriver.data.successMessage);
                        stopAsyncLoading(extraIndex);
                      }
                    }
                    else {
                      createNotification(driveToken.data.msg);
                      stopAsyncLoading(extraIndex);
                    }
                  } else {
                    goToNext();
                    step.isDone = true;
                  }
                } else
                  createNotification(respair.data.msg);
                stopAsyncLoading(extraIndex);
              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);
              });
            // BevAuthToekn().then(res => {
            //   debugger;
            //   bevTokenData.success = res.data.success;
            //   bevTokenData.errorMessage = res.data.errorMessage;
            //   bevTokenData.validity = null;
            //   if (res.data.success) {
            //     bevTokenData.authToken = res.data.authToken;
            //     bevTokenData.successMessage = res.data.successMessage;
            //     bevTokenData.validity = res.data.validity;
            //   }
            //   DriveEligibility().then(resdriver => {
            //     debugger
            //     if (res.data.success) {
            //       if (resdriver.data.status === 1) {
            //         validatePairEVAPICall({ otp: _otp, ev_qr_code: qrscan_val4 })
            //           .then((respair) => {
            //             if (respair.data.status === 1) {
            //               goToNext();
            //               step.isDone = true;
            //             } else
            //               createNotification(respair.data.msg);
            //             stopAsyncLoading(extraIndex);
            //           }).catch(error => {
            //             createNotification("something went wrong");
            //             stopAsyncLoading(extraIndex);
            //           });
            //       } else {
            //         createNotification(res.data.successMessage);
            //       }
            //     } else {
            //       createNotification(res.data.msg);
            //     }
            //   })
            // }).catch(err => {
            //   createNotification("something went wrong");
            //   stopAsyncLoading(extraIndex);
            // });

            return;
          case 'step6':
            validateScanBatteryAPICall({ batterytype: "Charged", battery_sq: "1", batteryqrval: qrscan_val5, scanevVal: qrscan_val4 })
              .then((res) => {
                if (res.data.status === 1) {
                  goToNext();
                  step.isDone = true;
                } else
                  createNotification(res.data.msg);
                stopAsyncLoading(extraIndex);
              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);
              });
            return;
          case 'step7':
            validateScanBatteryAPICall({ batterytype: "Charged", battery_sq: "2", batteryqrval: qrscan_val6, scanevVal: qrscan_val4 })
              .then((res) => {
                if (res.data.status === 1) {
                  goToNext();
                  step.isDone = true;
                } else
                  createNotification(res.data.msg);
                stopAsyncLoading(extraIndex);
              }).catch(error => {
                createNotification("something went wrong");
                stopAsyncLoading(extraIndex);
              });
            return;
          case 'step8':
            return;
        }
      } else {
        createNotification("Please Fill up data correctly");
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  //API call
  const validateStartOTPAPI = async ({ otp }) => {
    const currentUser = getCurrentUser();
    const loginRes = await axios.post(validateOTPAPI, { "otp_value": otp }, {
      headers: {
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
    return loginRes;
  };
  const validateScanEVAPICall = async ({ scanevVal }) => {
    const currentUser = getCurrentUser();
    const scanevres = await axios.post(validateScanEVAPI, { "ev_qr_code": scanevVal }, {
      headers: {
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
    return scanevres;
  };
  const validatePairEVAPICall = async ({ otp, ev_qr_code }) => {
    const currentUser = getCurrentUser();

    const scanevres = await axios.post(validatePairEVAPI, { "otp_value": otp, "ev_qr_code": ev_qr_code }, {
      headers: {
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
    return scanevres;
  };
  const validateScanBatteryAPICall = async ({ batterytype, battery_sq, batteryqrval, scanevVal }) => {
    const currentUser = getCurrentUser();
    const scanbatteryres = await axios.post(validateScanBatteryAPI, { "battery_type": batterytype, "battery_sequence": battery_sq, "battery_qr_code": batteryqrval, "ev_qr_code": scanevVal }, {
      headers: {
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
    return scanbatteryres;
  };

  const BevAuthToekn = async () => {
    //"https://admin.billionmobility.com/BEV/api/ChargeZone/GenerateAuthToken"

    let posturl = driveVerifyDetail.url;
    var raw = {
      "userName": driveVerifyDetail.userid, // "billion-e",
      "password": driveVerifyDetail.password// "Rtj9on$Qds("
    };

    let request = await axios.post(posturl, raw);
    return request;
  }

  const DriveEligibility = async () => {
    //"https://admin.billionmobility.com/BEV/api/ChargeZone/isDriverEligibleForBatterySwap"
    debugger
    let posturl = driveVerifyDetail.eligible_url;

    const headers = {
      'Authorization': bevTokenData.authToken
    }

    var raw = {
      "vehicleVin": qrscan_val4
    };
    let request = await axios.post(posturl, raw, {
      headers: headers
    }).catch(error => {
      console.log(error);
      createNotification("Something went wrong");
    });
    return request;
  }


  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.start" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <div className="pt-3">
                  <h3>
                    Unpair Batteries
                  </h3>
                </div>
                <TopNavigation className="justify-content-center" disableNav />
                <Steps>

                  <Step
                    id="step1"
                    name="Step 1"
                    desc="Scan EV"
                  >
                    <div className="wizard-basic-step">
                      {loading ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[0]}
                          initialValues={{
                            scanev1: qrscan_val1,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right">
                              <FormGroup>
                                <Label>Scan EV</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="scanev1"
                                    value={qrscan_val1}
                                    onChange={e => setqrscan_val1(e.target.value)}
                                    validate={validateScanEV1}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm " onClick={btnScanQR1}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR1 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR1}
                                        onScan={handleScanQR1}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}
                                {errors.scanev1 && touched.scanev1 && (
                                  <div className="invalid-feedback d-block">
                                    {errors.scanev1}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>
                  <Step
                    id="step2"
                    name="Step 2"
                    desc="Scan DB 1"
                  >
                    <div className="wizard-basic-step">
                      {loading ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[1]}
                          initialValues={{
                            discharge_bt1: qrscan_val2,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right error-l-75">
                              <FormGroup>
                                <Label>Scan Discharge Battery-1</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="discharge_bt1"
                                    type="text"
                                    value={qrscan_val2}
                                    onChange={e => setqrscan_val2(e.target.value)}
                                    validate={validatedischarge_bt1}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm" onClick={btnScanQR2}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR2 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR2}
                                        onScan={handleScanQR2}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}
                                {errors.discharge_bt1 && touched.discharge_bt1 && (
                                  <div className="invalid-feedback d-block">
                                    {errors.discharge_bt1}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>
                  <Step
                    id="step3"
                    name="Step 3"
                    desc="Scan DB 2"
                  >
                    <div className="wizard-basic-step">
                      {loading ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[2]}
                          initialValues={{
                            discharge_bt2: qrscan_val3,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right error-l-75">
                              <FormGroup>
                                <Label>Scan Discharge Battery-2</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="discharge_bt2"
                                    type="text"
                                    value={qrscan_val3}
                                    onChange={e => setqrscan_val3(e.target.value)}
                                    validate={validatedischarge_bt2}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm" onClick={btnScanQR3}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR3 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR3}
                                        onScan={handleScanQR3}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}
                                {errors.discharge_bt2 && (
                                  <div className="invalid-feedback d-block">
                                    {errors.discharge_bt2}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>
                  <Step id="step8" hideTopNav hidebottomnav render={({ previous }) => (
                    <div className="wizard-basic-step text-center pt-3">
                      {loading ? (
                        <div>
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2 className="mb-2">
                            <IntlMessages id="wizard.content-thanks" />
                          </h2>
                          <p>
                            <IntlMessages id="wizard.registered" />
                          </p>

                          <p>
                            <Button onClick={() => window.location.reload(true)}>Restart</Button>
                            <br />
                          </p>
                        </div>
                      )}
                    </div>)}>
                  </Step>

                </Steps>
                <BottomNavigation
                  onClickNext={onClickNext}
                  onClickPrev={onClickPrev}
                  className={`justify-content-center ${bottomNavHidden && 'invisible'
                    }`}
                  prevLabel={messages['wizard.prev']}
                  nextLabel={messages['wizard.next']}
                />
              </Wizard>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <div className="pt-3">
                  <h3>
                    Pair Batteries
                  </h3>
                </div>
                <TopNavigation className="justify-content-center" disableNav />
                <Steps>
                  <Step
                    id="step4"
                    name="Step 1"
                    desc="OTP"
                  >
                    <div className="wizard-basic-step">

                      {loading1 ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (



                        <Formik
                          innerRef={forms[3]}
                          initialValues={{
                            otp: fields[3].value,
                          }}
                          //onSubmit={() => {}}

                          onSubmit={(values, actions) => {


                          }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right">
                              <FormGroup>
                                <Label>Enter OTP</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="otp"
                                    value={qrscan_otp}
                                    validate={validateOTP}
                                    onChange={e => setqrscan_otp(e.target.value)}
                                    placeholder="Enter OTP"
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm">
                                        <i className="glyph-icon simple-icon-pencil"></i>
                                      </Button>
                                    </span>
                                  </div>
                                </div>
                                {errors.otp && touched.otp && (
                                  <div className="invalid-feedback d-block">
                                    {errors.otp}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>

                      )}

                    </div>
                  </Step>

                  <Step
                    id="step5"
                    name="Step 2"
                    desc="Scan EV"
                  >
                    <div className="wizard-basic-step">
                      {loading1 ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[4]}
                          initialValues={{
                            scanev: qrscan_val5,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right">
                              <FormGroup>
                                <Label>Scan EV</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="scanev"
                                    value={qrscan_val4}
                                    onChange={e => setqrscan_val4(e.target.value)}
                                    validate={validateScanEV}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm" onClick={btnScanQR4}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR4 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR4}
                                        onScan={handleScanQR4}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}

                                {errors.scanev && touched.scanev && (
                                  <div className="invalid-feedback d-block">
                                    {errors.scanev}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>
                  <Step
                    id="step6"
                    name="Step 3"
                    desc="Scan CB 1"
                  >
                    <div className="wizard-basic-step">
                      {loading1 ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[5]}
                          initialValues={{
                            charge_bt1: qrscan_val5,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right error-l-75">
                              <FormGroup>
                                <Label>Scan Charged Battery-1</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="charge_bt1"
                                    type="text"
                                    value={qrscan_val5}
                                    onChange={e => setqrscan_val5(e.target.value)}
                                    validate={validatecharge_bt1}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm" onClick={btnScanQR5}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR5 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR5}
                                        onScan={handleScanQR5}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}

                                {errors.charge_bt1 && touched.charge_bt1 && (
                                  <div className="invalid-feedback d-block">
                                    {errors.charge_bt1}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>
                  <Step
                    id="step7"
                    name="Step 4"
                    desc="Scan CB 2"
                  >
                    <div className="wizard-basic-step">
                      {loading1 ? (
                        <div className="text-center pt-3">
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <Formik
                          innerRef={forms[6]}
                          initialValues={{
                            charge_bt2: qrscan_val6,
                          }}
                          onSubmit={() => { }}
                        >
                          {({ errors, touched }) => (
                            <Form className="av-tooltip tooltip-label-right error-l-75">
                              <FormGroup>
                                <Label>Scan Charged Battery-2</Label>
                                <div className="mb-3 input-group">
                                  <Field
                                    className="form-control"
                                    name="charge_bt2"
                                    type="text"
                                    value={qrscan_val6}
                                    onChange={e => setqrscan_val6(e.target.value)}
                                    validate={validatecharge_bt2}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text scan_grp">
                                      <Button type="button" className="btn scan_btn btn-sm" onClick={btnScanQR6}>
                                        <i className="glyph-icon simple-icon-frame"></i></Button>
                                    </span>
                                  </div>
                                </div>
                                {QR6 &&
                                  <Col lg="6" md="6" sm="12">
                                    <div>
                                      <QrReader
                                        delay={300}
                                        onError={handleScanQR6}
                                        onScan={handleScanQR6}
                                        style={{ width: '100%' }}
                                      />
                                    </div>
                                  </Col>}

                                {errors.charge_bt2 && (
                                  <div className="invalid-feedback d-block">
                                    {errors.charge_bt2}
                                  </div>
                                )}
                              </FormGroup>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </Step>

                  <Step id="step8" hideTopNav hidebottomnav>
                    <div className="wizard-basic-step text-center pt-3">
                      {loading ? (
                        <div>
                          <Spinner color="primary" className="mb-1" />
                          <p>
                            <IntlMessages id="wizard.async" />
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2 className="mb-2">
                            <IntlMessages id="wizard.content-thanks" />
                          </h2>
                          <p>
                            <IntlMessages id="wizard.registered" />
                          </p>
                          <p>
                            <Button onClick={() => window.location.reload(true)}>Restart</Button>
                            <br />
                          </p>
                        </div>
                      )}
                    </div>
                  </Step>
                </Steps>
                <BottomNavigation
                  onClickNext={onClickNext}
                  onClickPrev={onClickPrev}
                  className={`justify-content-center ${bottomNavHidden1 && 'invisible'
                    }`}
                  prevLabel={messages['wizard.prev']}
                  nextLabel={messages['wizard.next']}
                />
              </Wizard>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};

export default injectIntl(Start);
// const mapStateToProps = ({ authUser }) => {
//   const { loading, error } = authUser;
//   return { loading, error };
// };
// export default connect(mapStateToProps, {
//   loginUserAction: loginUser,
// })(injectIntl(Start));
