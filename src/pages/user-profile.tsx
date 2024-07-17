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
  const { setUsername } = useUser();

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          const updatedProfile = { ...userProfile, ...values };
          axios
            .put(`/api/user-profile/${userProfile.id}`, updatedProfile)
            .then((response) => {
              console.log('Profile updated:', response.data);
              message.success('Profile updated successfully!');
              setIsEditing(false);
              setUsername(updatedProfile.username);
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
          <Title level={2}>User Profile</Title>
          <Form
            form={form}
            initialValues={{
              avatar: userProfile.avatar,
              username: userProfile.username,
              email: userProfile.email,
              phone: userProfile.phone,
              bio: userProfile.bio,
              country: userProfile.country,
              region: userProfile.region,
              nickname: userProfile.nickname,
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
                <Text strong>Nickname: </Text>
              </Col>
              <Col span={16}>
                {isEditing ? (
                  <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: 'Please input your nickname!' }]}
                    style={{ marginBottom: 0 }}>
                    <Input className="profile-input" />
                  </Form.Item>
                ) : (
                  <Text className="profile-text">{userProfile.nickname}</Text>
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
        <Col xs={isEditing ? 8 : 24} style={{ textAlign: 'center' }}>
          <Button block type="primary" onClick={handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Col>
        <Col xs={8} />
        {isEditing ? (
          <Col xs={8} style={{ textAlign: 'center' }}>
            <Button block danger type="primary" onClick={handleEditCancel}>
              {isEditing ? 'Cancel' : 'Cancel'}
            </Button>
          </Col>
        ) : (
          <div />
        )}
      </Row>
    </Card>
  );
}

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { setUsername } = useUser();

  useEffect(() => {
    axios
      .get('/api/user-profile/1')
      .then((response) => {
        setUserProfile(response.data.user);
        setUsername(response.data.user.nickname);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [setUsername]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return <UserProfileComponent userProfile={userProfile} />;
}

export default WithSimpleLayout(UserProfilePage);
