/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Typography, Button, Input, Space, Form, message } from 'antd';
import { UserProfile } from '../types/user-profile';
import WithSimpleLayout from '../layout/with-simple-layout';
import './user-profile.css';
import { useUser } from '../contexts/user-context';

const { Title, Text } = Typography;

function UserProfileComponent({ userProfile }: { userProfile: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { nickname, setNickname } = useUser();

  const handleEditClick = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          axios
            .put(`/api/user-profile/${userProfile.id}`, values)
            .then((response) => {
              console.log('Profile updated:', response.data);
              message.success('Profile updated successfully!');
              setIsEditing(false);
              setNickname(values.username);
              window.location.reload();
            })
            .catch((error) => {
              console.error('Error updating profile:', error);
              message.error('Failed to update profile.');
            });
        })
        .catch((errorInfo) => {
          console.log('Validate Failed:', errorInfo);
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
                  <Text className="profile-text">{nickname}</Text>
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { setNickname } = useUser();

  useEffect(() => {
    axios
      .get('/api/user-profile/1')
      .then((response) => {
        setUserProfile(response.data.user);
        setNickname(response.data.user.username);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [setNickname]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return <UserProfileComponent userProfile={userProfile} />;
}

export default WithSimpleLayout(UserProfilePage);
