import { getalldevicesurl, notificationurl } from "../apiurl";
import axiosInstance from "../axios";

export const createNotification = async ({
  toast,
  userId,
  notification_type,
  target_audience,
  title,
  message,
  selectedUser,
  selectedImage,
}) => {
  try {
    const token = localStorage.getItem("access");
    const formData = new FormData();

    formData.append("audience", target_audience);
    formData.append("notification_type", notification_type);
    formData.append("title", title);
    formData.append("message", message);

    if (selectedUser) {
      formData.append("user_id", selectedUser.value);
    }

    if (selectedImage) {
      formData.append("attach_file", selectedImage);
    }

    const response = await axiosInstance.post(
      `/notification/${userId}/notifications-create`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};


export const getnotifications = async ({
  toast,
  setnotifications,
  id,
  created_at,
}) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axiosInstance.get(
      `/notification/${id}/list?created_at=${created_at}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      setnotifications(response.data);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getNotificationsCount = async ({
  toast,
  setnotificationscount,
  id,
}) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axiosInstance.get(
      `/notification/${id}/notifications-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      setnotificationscount(response.data);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getdetailsnotifications = async ({ toast, setdetails, id }) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axiosInstance.get(`/notification/${id}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      setdetails(response.data);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
export const updatenotification = async ({ toast, id }) => {
  try {
    const token = localStorage.getItem("access");
    const data = {
      is_seen: true,
    };
    const response = await axiosInstance.patch(
      `${notificationurl}${id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      // setdetails(response.data);
    } else {
      // toast.error("Something went wrong")
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getLogDevices = async ({ toast, setDevices }) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axiosInstance.get(getalldevicesurl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      setDevices(response.data);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
