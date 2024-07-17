/* eslint-disable no-console */
import { useState } from 'react';
import { Card, Col, Row, Avatar, Typography, Button, Input, Space, Form, message } from 'antd';
import { UserProfile } from '../types/user-profile';
import userProfileData from '../data/user-profile-data';
import WithSimpleLayout from '../layout/with-simple-layout';
import './user-profile.css';

const { Title, Text } = Typography;

function UserProfileComponent({ userProfile }: { userProfile: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEditClick = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          console.log('Received values of form: ', values);
          // success
          message.success('Profile updated successfully!');
          setIsEditing(false);
        })
        .catch((errorInfo) => {
          console.log('Validate Failed:', errorInfo);
          // error
        });
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <Avatar size={120} src={userProfile.avatar} />
        </Col>
        <Col xs={24} md={18}>
          <Title level={2}>{userProfile.nickname}</Title>
          <Form
            form={form}
            initialValues={{
              username: userProfile.username,
              email: userProfile.email,
              phone: userProfile.phone,
              bio: userProfile.bio,
              country: userProfile.country,
              region: userProfile.region,
            }}
            layout="vertical">
            <Row className="profile-row">
              <Col span={8}>
                <Text strong>
                  <span style={{ color: 'red' }}>*</span> Username:
                </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    style={{ marginBottom: 0 }}>
                    <Input className="profile-input" />
                  </Form.Item>
                ) : (
                  <Text className="profile-text">{userProfile.username}</Text>
                )}
              </Col>
            </Row>
            <Row className="profile-row">
              <Col span={8}>
                <Text strong>Email: </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Form.Item
                    name="email"
                    rules={[
                      { type: 'email', message: 'The input is not valid E-mail!' },
                      { required: true, message: 'Please input your email!' },
                    ]}
                    style={{ marginBottom: 0 }}>
                    <Input className="profile-input" />
                  </Form.Item>
                ) : (
                  <Text className="profile-text">{userProfile.email}</Text>
                )}
              </Col>
            </Row>
            <Row className="profile-row">
              <Col span={8}>
                <Text strong>
                  <span style={{ color: 'red' }}>*</span> Phone:
                </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    style={{ marginBottom: 0 }}>
                    <Input type="number" className="profile-input" />
                  </Form.Item>
                ) : (
                  <Text className="profile-text">{userProfile.phone}</Text>
                )}
              </Col>
            </Row>
            <Row className="profile-row">
              <Col span={8}>
                <Text strong>Bio: </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Form.Item name="bio" style={{ marginBottom: 0 }}>
                    <Input.TextArea className="profile-input" />
                  </Form.Item>
                ) : (
                  <Text className="profile-text">{userProfile.bio}</Text>
                )}
              </Col>
            </Row>
            <Row className="profile-row">
              <Col span={8}>
                <Text strong>Country and Region: </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Space.Compact>
                    <Form.Item name="country" style={{ width: '50%', marginBottom: 0 }}>
                      <Input className="profile-input" />
                    </Form.Item>
                    <Form.Item name="region" style={{ width: '50%', marginBottom: 0 }}>
                      <Input className="profile-input" />
                    </Form.Item>
                  </Space.Compact>
                ) : (
                  <Text className="profile-text">{`${userProfile.country}, ${userProfile.region}`}</Text>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col xs={24} style={{ textAlign: 'center' }}>
          <Button block type="primary" onClick={handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

function UserProfilePage() {
  return <UserProfileComponent userProfile={userProfileData} />;
}

export default WithSimpleLayout(UserProfilePage);
