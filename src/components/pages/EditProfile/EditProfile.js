import React, { useState } from "react";
import * as formelement from "../../../data/Form/formelement/formelement";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
  Breadcrumb,
} from "react-bootstrap";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ROLES_SLUG } from "../../../constants/strings";



export default function EditProfile() {
  const _USER = useSelector(e => e?.common);

  const api = useApi();
  const [changePassword, setChangePassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePassword = async (name) => {
    if (name === 'update') {
      if ((changePassword.length > 5 && newPassword.length > 5 && confirmPassword.length > 5)) {
        if (newPassword === confirmPassword) {
          let req = {
            current_password: changePassword,
            new_password: newPassword,
            confirm_password: confirmPassword
          };
          const {data} = await api.post(`${baseUrl}/api/${ROLES_SLUG[_USER?.role]}/update-password`, req)
        
      
          if (data.error) {
            toast.error(data.message, {
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: true,
              autoClose: 3000, 
              theme: "colored",
            });
          }
          else {
            toast.success(data.message ? data.message : data.messages, {
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: true,
              autoClose: 3000,
              theme: "colored",
            });
          }
        }
        else {
          toast.error('New Password and Confirm Password is not matched', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
      else {
        toast.error('please fill each field of password', {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
          theme: "colored",
        });
      }
    }
    else if (name === 'cancel') {
      setChangePassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Profile</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="/Profile">
              Profile
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Edit Profile
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

      </div>

      <Row>
        <Col lg={12} xl={4} md={12} sm={12}>
          <Card className="profile-edit">
            <Card.Header>
              <Card.Title>Edit Password</Card.Title>
            </Card.Header>
            <Form autoComplete="off">

              <Card.Body>
                <div className="d-flex mb-3">
                  <img
                    alt="User Avatar"
                    className="rounded-circle avatar-lg me-2"
                    src={require("../../../assets/images/users/8.jpg")}
                  />
                  <div className="ms-auto mt-xl-2 mt-lg-0 me-lg-2">
                    <Link
                      to={`/editProfile`}
                      className="btn btn-primary btn-sm mt-1 mb-1 me-2"
                    >
                      <i className="fe fe-camera me-1"></i>Edit profile
                    </Link>
                    <Link to="#" className="btn btn-danger btn-sm mt-1 mb-1 me-2">
                      <i className="fe fe-camera-off me-1">
                      </i>Delete profile
                    </Link>
                  </div>
                </div>
                <FormGroup>
                  <Form.Label className="form-label">Change Password</Form.Label>
                  <FormControl
                    type="password"
                    className="form-control"
                    placeholder="Enter your old password"
                    value={changePassword}
                    onChange={(e) => setChangePassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label className="form-label">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    placeholder="Enter Your New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label className="form-label">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    placeholder="Enter Your New password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </FormGroup>
              </Card.Body>
              <Card.Footer className="text-end">
                <Link to="#" className="btn btn-primary me-2" onClick={() => handlePassword('update')}>
                  Updated
                </Link>
                <Link to="#" className="btn btn-danger" onClick={() => handlePassword('cancel')}>
                  Cancel
                </Link>
              </Card.Footer>
            </Form>
          </Card>
          <Card className="panel-theme">
            <Card.Header>
              <div className="float-start">
                <Card.Title as="h3">Contact</Card.Title>
              </div>
              <div className="clearfix"></div>
            </Card.Header>
            <Card.Body className="no-padding">
              <ListGroup className="no-margin">
                <ListGroup.Item className="list-group-item">
                  <i className="fa fa-envelope list-contact-icons border text-center br-100"></i>
                  <span className="contact-icons">support@demo.com</span>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item">
                  <i className="fa fa-globe list-contact-icons border text-center br-100"></i>
                  <span className="contact-icons"> www.abcd.com</span>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item">
                  <i className="fa fa-phone list-contact-icons border text-center br-100"></i>
                  <span className="contact-icons">+125 5826 3658 </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12} xl={8} md={12} sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h3">Edit Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col lg={6} md={12}>
                  <FormGroup>
                    <label htmlFor="exampleInputname">First Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputname"
                      placeholder="First Name"
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={12}>
                  <FormGroup>
                    <label htmlFor="exampleInputname1">Last Name</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputname1"
                      placeholder="Enter Last Name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="mt-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <Form.Control
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="email address"
                />
              </FormGroup>
              <FormGroup className="mt-2">
                <label htmlFor="exampleInputnumber">Conatct Number</label>
                <Form.Control
                  type="number"
                  className="form-control"
                  id="exampleInputnumber"
                  placeholder="ph number"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className="form-label">About Me</Form.Label>
                <textarea
                  className="form-control"
                  rows="6"
                  defaultValue="My bio.."
                ></textarea>
              </FormGroup>
              <FormGroup>
                <Form.Label className="form-label">Website</Form.Label>
                <Form.Control
                  className="form-control"
                  placeholder="http://splink.com"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className="form-label">Date Of Birth</Form.Label>
                <Row>
                  <Col md={4}>
                    <formelement.Selectdate />
                  </Col>
                  <Col md={4}>
                    <formelement.Dateofbirth />
                  </Col>
                  <Col md={4}>
                    <formelement.Selectyear />
                  </Col>
                </Row>
              </FormGroup>
            </Card.Body>
            <Card.Footer className="text-end">
              <Link to="#" className="btn btn-success mt-1 me-2">
                Save
              </Link>
              <Link to="#" className="btn btn-danger mt-1 me-2">
                Cancel
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

    </div >
  );
}
