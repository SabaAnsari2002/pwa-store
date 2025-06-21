import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
}

interface Store {
  id: number;
  name: string;
  address: string;
}

interface StoreRole {
  id: number;
  user: User;
  store: Store;
  role: string;
  is_active: boolean;
  created_at: string;
}

const TeamManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeRoles, setStoreRoles] = useState<StoreRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [newRole, setNewRole] = useState({
    user: "",
    role: "cashier",
  });

  const getRoleName = (role: string): string => {
    const roleNames: Record<string, string> = {
      cashier: "صندوق دار",
      warehouse: "انباردار",
      support: "پشتیبان",
      manager: "مدیر فروشگاه",
    };
    return roleNames[role] || role;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        
        if (!token) {
          navigate("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // دریافت لیست فروشگاه‌های کاربر
        const storesRes = await axios.get("http://localhost:8000/api/stores/", { headers });
        setStores(storesRes.data);

        if (storesRes.data.length > 0) {
          setSelectedStore(storesRes.data[0].id.toString());
          await fetchStoreRoles(storesRes.data[0].id, headers);
        }

        // دریافت لیست کاربران قابل اضافه کردن
        const usersRes = await axios.get(
          `http://localhost:8000/api/users/search/?store_id=${storesRes.data[0]?.id || ""}`,
          { headers }
        );
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchStoreRoles = async (storeId: number, headers: any) => {
    const rolesRes = await axios.get(
      `http://localhost:8000/api/store-roles/?store_id=${storeId}`,
      { headers }
    );
    setStoreRoles(rolesRes.data);
  };

  const handleStoreChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const storeId = e.target.value;
    setSelectedStore(storeId);
    
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      await fetchStoreRoles(parseInt(storeId), headers);

      // دریافت کاربران جدید برای این فروشگاه
      const usersRes = await axios.get(
        `http://localhost:8000/api/users/search/?store_id=${storeId}`,
        { headers }
      );
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error changing store:", error);
      toast.error("خطا در تغییر فروشگاه");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async () => {
    if (!newRole.user || !selectedStore) {
      toast.warning("لطفاً کاربر و فروشگاه را انتخاب کنید");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `http://localhost:8000/api/store-roles/?store_id=${selectedStore}`,
        {
          user: newRole.user,
          role: newRole.role,
        },
        { headers }
      );

      setStoreRoles([...storeRoles, response.data]);
      toast.success("نقش با موفقیت اضافه شد");

      // به‌روزرسانی لیست کاربران قابل اضافه کردن
      const usersRes = await axios.get(
        `http://localhost:8000/api/users/search/?store_id=${selectedStore}`,
        { headers }
      );
      setUsers(usersRes.data);

      setNewRole({ user: "", role: "cashier" });
    } catch (error: any) {
      console.error("Error adding role:", error);
      toast.error(error.response?.data?.message || "خطا در اضافه کردن نقش");
    }
  };

  const handleDeleteRole = async (id: number) => {
    if (!window.confirm("آیا از حذف این نقش مطمئن هستید؟")) return;

    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/store-roles/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStoreRoles(storeRoles.filter((role) => role.id !== id));
      toast.success("نقش با موفقیت حذف شد");

      // به‌روزرسانی لیست کاربران قابل اضافه کردن
      const usersRes = await axios.get(
        `http://localhost:8000/api/users/search/?store_id=${selectedStore}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("خطا در حذف نقش");
    }
  };

  const toggleActiveStatus = async (id: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(
        `http://localhost:8000/api/store-roles/${id}/toggle_active/`,
        {},
        { headers }
      );

      setStoreRoles(
        storeRoles.map((role) =>
          role.id === id ? { ...role, is_active: !currentStatus } : role
        )
      );
      toast.success(`وضعیت نقش ${!currentStatus ? "فعال" : "غیرفعال"} شد`);
    } catch (error) {
      console.error("Error toggling role status:", error);
      toast.error("خطا در تغییر وضعیت نقش");
    }
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (stores.length === 0) {
    return (
      <div>
        <h2>شما هیچ فروشگاهی ندارید</h2>
        <button onClick={() => navigate("/seller-register")}>ایجاد فروشگاه جدید</button>
      </div>
    );
  }

  return (
    <div>
      <h1>مدیریت تیم فروشگاه</h1>

      <div>
        <label>انتخاب فروشگاه:</label>
        <select value={selectedStore} onChange={handleStoreChange}>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>افزودن نقش جدید</h2>
        <select
          value={newRole.user}
          onChange={(e) => setNewRole({ ...newRole, user: e.target.value })}
        >
          <option value="">انتخاب کاربر</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.first_name} {user.last_name})
            </option>
          ))}
        </select>

        <select
          value={newRole.role}
          onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
        >
          <option value="cashier">صندوق دار</option>
          <option value="warehouse">انباردار</option>
          <option value="support">پشتیبان</option>
          <option value="manager">مدیر فروشگاه</option>
        </select>

        <button onClick={handleAddRole} disabled={!newRole.user}>
          افزودن نقش
        </button>
      </div>

      <div>
        <h2>نقش‌های فعلی</h2>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {storeRoles.map((role) => (
              <tr key={role.id}>
                <td>
                  {role.user.first_name} {role.user.last_name} ({role.user.username})
                </td>
                <td>{getRoleName(role.role)}</td>
                <td>{role.is_active ? "فعال" : "غیرفعال"}</td>
                <td>
                  <button onClick={() => toggleActiveStatus(role.id, role.is_active)}>
                    {role.is_active ? "غیرفعال کردن" : "فعال کردن"}
                  </button>
                  <button onClick={() => handleDeleteRole(role.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamManagement;