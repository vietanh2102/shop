import { useCallback, useEffect, useState } from "react";
import { userApiPrivate } from "../../axios/userApi";
import { Button, Modal, Table } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading/Loading";
import {
  columns,
  columnsOrders,
} from "../../components/ColumnsTable/ColumnsTable";
import { OrderInfo } from "../../types";
import { useGetCartUserQuery } from "../../redux/service/product.service";
import { useAppSelector } from "../../hooks/reduxHook";
import { UserInfo } from "../../types/Users.type";
import UpdateForm from "../../components/Form/UpdateForm/UpdateForm";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm/ChangePasswordForm";

function Profile() {
  const [profile, setProfile] = useState<UserInfo>();
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [OpenModalChangePassword, setOpenModalChangePassword] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const { data, isFetching } = useGetCartUserQuery(user.id);

  const date =
    profile?.date_of_birth &&
    new Date(profile.date_of_birth).toLocaleDateString("pt-PT");

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userApiPrivate.get(`me`);
      setProfile(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-[1170px] mx-auto px-8 lg:px-0 mt-[128px]">
      <div className="flex text-[38px] my-6">
        <UserOutlined />
        <p className=" font-light ml-2">Your Profile</p>
      </div>
      <div className="border">
        <div className="flex gap-4 ml-8 py-4 border-b">
          <p className="font-bold">Email:</p>
          <p>{profile?.email}</p>
        </div>
        <div className="flex gap-4 ml-8 py-4 border-b">
          <p className="font-bold">Name:</p>
          <p>{profile?.name}</p>
        </div>
        <div className="flex gap-4 ml-8 py-4 border-b">
          <p className="font-bold">Phone:</p>
          <p>{profile?.phone}</p>
        </div>
        <div className="flex gap-4 ml-8 py-4 border-b">
          <p className="font-bold">Address:</p>
          <p>{profile?.address}</p>
        </div>
        <div className="flex gap-4 ml-8 py-4 border-b">
          <p className="font-bold">Date of birth:</p>
          <p>{date}</p>
        </div>
      </div>
      <div className="flex justify-center py-4 gap-2">
        <Button onClick={() => setOpenModalChangePassword(true)}>
          Change your password
        </Button>
        <Button type="primary" onClick={() => setOpenModalUpdate(true)}>
          Update Information
        </Button>
      </div>
      <Modal
        title="Change your password"
        centered
        open={OpenModalChangePassword}
        onCancel={() => setOpenModalChangePassword(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              form="myChangePasswordForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Update
            </Button>
          </>
        )}
      >
        <ChangePasswordForm
          setOpenModalChangePassword={setOpenModalChangePassword}
        />
      </Modal>
      <Modal
        title="Update information"
        centered
        open={openModalUpdate}
        onCancel={() => setOpenModalUpdate(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              form="updateForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Update
            </Button>
          </>
        )}
      >
        <UpdateForm
          profile={profile}
          getUser={getUser}
          setOpenModalUpdate={setOpenModalUpdate}
        />
      </Modal>
      <div className="flex text-[38px] my-6">
        <ShoppingCartOutlined />
        <p className=" font-light ml-2">Your Order</p>
      </div>
      <Table<OrderInfo>
        columns={columnsOrders}
        dataSource={data}
        scroll={{ x: 1000 }}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={columns}
              dataSource={record.carts}
              pagination={false}
              rowKey={(columns) => record.userId + columns.id + columns.size}
            />
          ),
          rowExpandable: (record) => record.carts && record.carts.length > 0,
        }}
        pagination={false}
        rowKey={(columns) => columns.id}
        loading={isFetching}
      />
    </div>
  );
}

export default Profile;
