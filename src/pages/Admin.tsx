import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface License {
  id: string;
  hwid: string;
  fullName: string;
  vkProfile: string;
  status: "active" | "inactive";
  created: string;
  lastCheck: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "3610901") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Неверный логин или пароль");
    }
  };

  const [licenses] = useState<License[]>([
    {
      id: "LIC-001",
      hwid: "A1B2C3D4E5F6",
      fullName: "Иванов Иван Иванович",
      vkProfile: "https://vk.com/ivanov_ivan",
      status: "active",
      created: "2024-01-15",
      lastCheck: "2024-12-30 14:30:25",
    },
    {
      id: "LIC-002",
      hwid: "F6E5D4C3B2A1",
      fullName: "Петров Петр Петрович",
      vkProfile: "https://vk.com/petrov_petr",
      status: "inactive",
      created: "2024-02-20",
      lastCheck: "2024-12-25 09:15:10",
    },
    {
      id: "LIC-003",
      hwid: "1A2B3C4D5E6F",
      fullName: "Сидоров Сидор Сидорович",
      vkProfile: "https://vk.com/sidorov_sidor",
      status: "active",
      created: "2024-03-10",
      lastCheck: "2024-12-30 16:45:33",
    },
  ]);

  const [newLicense, setNewLicense] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] text-white flex items-center justify-center">
        <div className="bg-[#2A2F3C] rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Icon
              name="Shield"
              size={48}
              className="mx-auto mb-4 text-[#0EA5E9]"
            />
            <h1 className="text-2xl font-bold mb-2">Админ панель</h1>
            <p className="text-[#8E9196]">Введите логин и пароль для входа</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Логин"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="bg-[#1A1F2C] border-[#8E9196] text-white"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="bg-[#1A1F2C] border-[#8E9196] text-white"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-500 text-sm text-center">
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#0EA5E9] hover:bg-[#0284C7]"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              License Admin Panel
            </h1>
            <p className="text-[#8E9196]">Manage hardware-bound licenses</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#8E9196]">
              <Icon name="Shield" size={20} />
              <span className="font-mono text-sm">SECURE</span>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              size="sm"
              variant="outline"
              className="border-[#8E9196] text-[#8E9196] hover:bg-[#8E9196] hover:text-[#1A1F2C]"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Add License */}
        <div className="bg-[#2A2F3C] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Add New License
          </h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter Hardware ID (HWID)"
              value={newLicense}
              onChange={(e) => setNewLicense(e.target.value)}
              className="bg-[#1A1F2C] border-[#8E9196] text-white font-mono"
            />
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7]">
              <Icon name="Key" size={16} className="mr-2" />
              Generate
            </Button>
          </div>
        </div>

        {/* Licenses Table */}
        <div className="bg-[#2A2F3C] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#8E9196]/20">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Icon name="Database" size={20} />
              License Database
            </h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-[#8E9196]/20 hover:bg-[#1A1F2C]/50">
                <TableHead className="text-[#8E9196]">License ID</TableHead>
                <TableHead className="text-[#8E9196]">Ф.И.О.</TableHead>
                <TableHead className="text-[#8E9196]">VK Профиль</TableHead>
                <TableHead className="text-[#8E9196]">Hardware ID</TableHead>
                <TableHead className="text-[#8E9196]">Status</TableHead>
                <TableHead className="text-[#8E9196]">Created</TableHead>
                <TableHead className="text-[#8E9196]">Last Check</TableHead>
                <TableHead className="text-[#8E9196]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow
                  key={license.id}
                  className="border-[#8E9196]/20 hover:bg-[#1A1F2C]/50"
                >
                  <TableCell className="font-mono text-white">
                    {license.id}
                  </TableCell>
                  <TableCell className="text-white">
                    {license.fullName}
                  </TableCell>
                  <TableCell>
                    <a
                      href={license.vkProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0EA5E9] hover:text-[#0284C7] underline flex items-center gap-1"
                    >
                      <Icon name="ExternalLink" size={14} />
                      VK
                    </a>
                  </TableCell>
                  <TableCell className="font-mono text-[#8E9196]">
                    {license.hwid}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        license.status === "active" ? "default" : "secondary"
                      }
                      className={
                        license.status === "active"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {license.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#8E9196]">
                    {license.created}
                  </TableCell>
                  <TableCell className="text-[#8E9196] font-mono text-sm">
                    {license.lastCheck}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#8E9196] text-[#8E9196]"
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* API Info */}
        <div className="mt-8 bg-[#2A2F3C] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Code" size={20} />
            API Endpoints
          </h2>
          <div className="space-y-2 font-mono text-sm text-[#8E9196]">
            <div>POST /api/license/check - Check license status</div>
            <div>POST /api/license/activate - Activate license</div>
            <div>GET /api/license/status/:id - Get license info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
