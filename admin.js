const defaultProducts = [
    { id: 1, name: "iPhone 15 Pro Max 256GB Natural Titanium", category: "Telefonlar", costPrice: 13500000, price: 15400000, stock: 18, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80" },
    { id: 2, name: "Samsung Galaxy S24 Ultra 512GB Grey", category: "Telefonlar", costPrice: 12000000, price: 14200000, stock: 4, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80" },
    { id: 3, name: "MacBook Pro 16 M3 Max 36GB / 1TB Space Black", category: "Elektronika", costPrice: 31000000, price: 36500000, stock: 9, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80" },
    { id: 4, name: "Sony WH-1000XM5 Quloqchin", category: "Aksessuarlar", costPrice: 3600000, price: 4300000, stock: 2, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" },
    { id: 5, name: "LG OLED EVO C3 55 Smart TV", category: "Maishiy texnika", costPrice: 14500000, price: 16800000, stock: 15, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80" },
    { id: 6, name: "Dyson V15 Detect Changyutgich", category: "Maishiy texnika", costPrice: 8200000, price: 9800000, stock: 0, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80" },
    { id: 7, name: "Apple Watch Series 9 GPS 45mm", category: "Aksessuarlar", costPrice: 4300000, price: 5200000, stock: 22, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&auto=format&fit=crop&q=80" },
    { id: 8, name: "Nike Air Force 1 '07 Krossovka", category: "Kiyimlar", costPrice: 1050000, price: 1450000, stock: 35, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80" }
];

const defaultUsers = [
    { id: 101, name: "Jahongir Abdumo'minov", role: "Super Admin", lastActive: "1 daqiqa oldin", ip: "195.158.8.42", online: true },
    { id: 102, name: "Alisher Navoiy", role: "Menejer", lastActive: "12 daqiqa oldin", ip: "213.230.96.11", online: true },
    { id: 103, name: "Sardor Komilov", role: "Mijoz", lastActive: " Bugun 19:42", ip: "84.54.80.12", online: true },
    { id: 104, name: "Malika Sharipova", role: "Mijoz", lastActive: "Bugun 18:15", ip: "178.218.201.5", online: false },
    { id: 105, name: "Rustam Qodirov", role: "Kuryer", lastActive: "Kecha 21:05", ip: "37.110.212.8", online: false },
    { id: 106, name: "Zuhra Aliyeva", role: "Mijoz", lastActive: "25-Avgust 14:20", ip: "89.236.216.44", online: false }
];

const defaultLogs = [
    { type: "login", title: "Alisher Navoiy tizimga kirdi", time: "12 daqiqa oldin", icon: "fa-right-to-bracket", bg: "#dcfce7", color: "#16a34a" },
    { type: "order", title: "Yangi buyurtma #ORD-9824 qabul qilindi", time: "25 daqiqa oldin", icon: "fa-cart-shopping", bg: "#f3e8ff", color: "#7000ff" },
    { type: "stock", title: "Sony Quloqchin zaxirasi oz qoldi (2 ta)", time: "1 soat oldin", icon: "fa-triangle-exclamation", bg: "#fef3c7", color: "#d97706" },
    { type: "user", title: "Yangi mijoz: Sardor Komilov ro'yxatdan o'tdi", time: "2 soat oldin", icon: "fa-user-plus", bg: "#e0f2fe", color: "#0284c7" },
    { type: "logout", title: "Malika Sharipova tizimdan chiqdi", time: "2 soat oldin", icon: "fa-right-from-bracket", bg: "#fee2e2", color: "#ef4444" }
];

const defaultTransactions = [
    { id: "TX-1001", date: "2026-08-25", desc: "Mahsulotlar savdo tushumi #ORD-9824", category: "Sotuv", type: "income", amount: 15400000, status: "Muvaffaqiyatli" },
    { id: "TX-1002", date: "2026-08-24", desc: "Apple iPhone 15 Pro omborga xarid qilish", category: "Zaxira Xaridi", type: "expense", amount: 27000000, status: "Muvaffaqiyatli" },
    { id: "TX-1003", date: "2026-08-24", desc: "Telegram & Instagram Target Reklama", category: "Marketing", type: "expense", amount: 3500000, status: "Muvaffaqiyatli" },
    { id: "TX-1004", date: "2026-08-23", desc: "Mahsulotlar savdo tushumi #ORD-9820", category: "Sotuv", type: "income", amount: 36500000, status: "Muvaffaqiyatli" },
    { id: "TX-1005", date: "2026-08-22", desc: "Server va Hosting to'lovi (AWS / Cloud)", category: "IT Xarajat", type: "expense", amount: 1200000, status: "Muvaffaqiyatli" }
];

let adminProducts = JSON.parse(localStorage.getItem('tezkor_admin_products')) || [...defaultProducts];
let adminUsers = [...defaultUsers];
let adminLogs = [...defaultLogs];
let adminTransactions = JSON.parse(localStorage.getItem('tezkor_admin_transactions')) || [...defaultTransactions];

let salesChartInstance = null;
let categoryChartInstance = null;
let reportChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    renderDashboardTables();
    renderProductsTable();
    renderUsersTable();
    renderLogsList();
    renderTopSellingTable();
    renderTransactionsTable();
    calculateAccountingMetrics();
    initCharts();
});

function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('tezkor_admin_logged') === 'true' || sessionStorage.getItem('tezkor_admin_logged') === 'true';
    const overlay = document.getElementById('adminAuthOverlay');
    if (!isLoggedIn) {
        overlay?.classList.add('active');
    } else {
        overlay?.classList.remove('active');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const loginVal = document.getElementById('adminAuthLogin').value.trim();
    const passVal = document.getElementById('adminAuthPassword').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');
    const remember = document.getElementById('rememberAdmin').checked;

    const savedPass = localStorage.getItem('tezkor_admin_pass') || '12345';
    const savedLogin = localStorage.getItem('tezkor_admin_user') || 'admin';

    if (loginVal === savedLogin && passVal === savedPass) {
        errorMsg.classList.remove('show');
        if (remember) {
            localStorage.setItem('tezkor_admin_logged', 'true');
        } else {
            sessionStorage.setItem('tezkor_admin_logged', 'true');
        }
        document.getElementById('adminAuthOverlay')?.classList.remove('active');
        showToast("Boshqaruv paneliga xush kelibsiz! 👋");
    } else {
        errorMsg.innerText = "Xato login yoki parol kiritildi!";
        errorMsg.classList.add('show');
    }
}

function handleAdminLogout() {
    localStorage.removeItem('tezkor_admin_logged');
    sessionStorage.removeItem('tezkor_admin_logged');
    document.getElementById('adminAuthOverlay')?.classList.add('active');
    showToast("Tizimdan chiqildi");
}

function togglePassVisibility() {
    const input = document.getElementById('adminAuthPassword');
    const icon = document.getElementById('passEyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}

function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');
    if (el) el.classList.add('active');

    if (window.innerWidth <= 992) {
        document.getElementById('sidebar').classList.remove('open');
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay) overlay.classList.remove('active');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function renderDashboardTables() {
    const recentTable = document.getElementById('recentOrdersTable');
    const lowStockList = document.getElementById('lowStockList');

    const ordersSample = [
        { id: "#ORD-9824", client: "Sardor Komilov", product: "iPhone 15 Pro Max", amount: "15,400,000 so'm", status: "Bajarildi", badgeClass: "success", date: "Bugun 20:12" },
        { id: "#ORD-9823", client: "Malika Sharipova", product: "Sony Quloqchin", amount: "4,300,000 so'm", status: "Yetkazilmoqda", badgeClass: "info", date: "Bugun 18:45" },
        { id: "#ORD-9822", client: "Alisher Navoiy", product: "MacBook Pro 16", amount: "36,500,000 so'm", status: "Bajarildi", badgeClass: "success", date: "Kecha 22:10" },
        { id: "#ORD-9821", client: "Rustam Qodirov", product: "Nike Air Force 1", amount: "1,450,000 so'm", status: "Jarayonda", badgeClass: "warning", date: "Kecha 16:30" }
    ];

    recentTable.innerHTML = ordersSample.map(o => `
        <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.client}</td>
            <td>${o.product}</td>
            <td><strong>${o.amount}</strong></td>
            <td><span class="badge-status ${o.badgeClass}">${o.status}</span></td>
            <td>${o.date}</td>
        </tr>
    `).join('');

    const lowStockItems = adminProducts.filter(p => p.stock <= 5);
    if (lowStockItems.length === 0) {
        lowStockList.innerHTML = `<p style="color: #64748b; font-size: 13px;">Barcha mahsulotlar zaxirada yetarli.</p>`;
    } else {
        lowStockList.innerHTML = lowStockItems.map(item => `
            <div class="low-stock-item" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <div class="low-stock-info" style="display:flex; align-items:center; gap:8px;">
                    <img src="${item.image}" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;">
                    <div>
                        <div class="low-stock-name" style="font-weight:600; font-size:13px;">${item.name}</div>
                        <span class="low-stock-count" style="font-size:11px; color:#ef4444;">${item.stock === 0 ? 'Tugagan (0)' : item.stock + ' ta qoldi'}</span>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 11px;" onclick="addStock(${item.id})">+10 ta</button>
            </div>
        `).join('');
    }
}

function addStock(productId) {
    const prod = adminProducts.find(p => p.id === productId);
    if (prod) {
        prod.stock += 10;
        localStorage.setItem('tezkor_admin_products', JSON.stringify(adminProducts));
        renderProductsTable();
        renderDashboardTables();
        showToast(`${prod.name} omboriga +10 ta qo'shildi! 📦`);
    }
}

function initCharts() {

    const salesCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesCtx) {
        salesChartInstance = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['1-Aug', '5-Aug', '10-Aug', '15-Aug', '20-Aug', '25-Aug'],
                datasets: [
                    {
                        label: 'Jami Savdo (so\'mda)',
                        data: [24000000, 42000000, 38000000, 65000000, 52000000, 78000000],
                        borderColor: '#7000ff',
                        backgroundColor: 'rgba(112, 0, 255, 0.1)',
                        fill: true,
                        tension: 0.35,
                        borderWidth: 3
                    },
                    {
                        label: 'Sof Foyda (so\'mda)',
                        data: [6000000, 11000000, 9500000, 16000000, 13000000, 19500000],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.05)',
                        fill: true,
                        tension: 0.35,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    }

    const catCtx = document.getElementById('categoryChart')?.getContext('2d');
    if (catCtx) {
        categoryChartInstance = new Chart(catCtx, {
            type: 'doughnut',
            data: {
                labels: ['Telefonlar', 'Elektronika', 'Maishiy texnika', 'Kiyimlar', 'Aksessuarlar'],
                datasets: [{
                    data: [42, 28, 15, 10, 5],
                    backgroundColor: ['#7000ff', '#0284c7', '#f59e0b', '#10b981', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    const reportCtx = document.getElementById('reportBarChart')?.getContext('2d');
    if (reportCtx) {
        reportChartInstance = new Chart(reportCtx, {
            type: 'bar',
            data: {
                labels: ['May', 'Iyun', 'Iyul', 'Avgust'],
                datasets: [
                    { label: 'Tushum (Daromad)', data: [110, 145, 160, 184.5], backgroundColor: '#7000ff' },
                    { label: 'Operatsion Xarajat', data: [85, 110, 122, 141.7], backgroundColor: '#cbd5e1' },
                    { label: 'Sof Foyda', data: [25, 35, 38, 42.8], backgroundColor: '#10b981' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    }
}

function renderProductsTable(items = adminProducts) {
    const tbody = document.getElementById('adminProductsTable');
    if (!tbody) return;

    tbody.innerHTML = items.map(p => {
        const profitPerUnit = p.price - (p.costPrice || (p.price * 0.8));
        let stockBadge = `<span class="badge-status success">${p.stock} ta</span>`;
        if (p.stock === 0) stockBadge = `<span class="badge-status danger">Tugagan</span>`;
        else if (p.stock <= 5) stockBadge = `<span class="badge-status warning">Oz qoldi (${p.stock})</span>`;

        return `
            <tr>
                <td><img src="${p.image}" class="table-img" alt="${p.name}"></td>
                <td><strong>${p.name}</strong></td>
                <td>${p.category}</td>
                <td>${formatPrice(p.costPrice || Math.round(p.price * 0.8))} so'm</td>
                <td><strong style="color: var(--primary);">${formatPrice(p.price)} so'm</strong></td>
                <td><span style="color: var(--success); font-weight: 600;">+${formatPrice(profitPerUnit)}</span></td>
                <td>${p.stock} ta</td>
                <td>${stockBadge}</td>
                <td>
                    <button class="btn-edit-sm" onclick="openEditProductModal(${p.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-danger-sm" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterProductsTable() {
    const query = document.getElementById('productSearchInput').value.toLowerCase();
    const catFilter = document.getElementById('prodCategoryFilter').value;
    const stockFilter = document.getElementById('prodStockFilter').value;

    let filtered = adminProducts.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query) || p.id.toString().includes(query);
        const matchesCat = catFilter === 'all' || p.category === catFilter;
        let matchesStock = true;
        if (stockFilter === 'instock') matchesStock = p.stock > 5;
        else if (stockFilter === 'lowstock') matchesStock = p.stock > 0 && p.stock <= 5;
        else if (stockFilter === 'outstock') matchesStock = p.stock === 0;

        return matchesQuery && matchesCat && matchesStock;
    });

    renderProductsTable(filtered);
}

function openAddProductModal() {
    document.getElementById('editProductId').value = '';
    document.getElementById('productForm').reset();
    document.getElementById('modalProductTitle').innerHTML = `<i class="fa-solid fa-box"></i> Yangi Mahsulot Qo'shish`;
    openModal('adminProductModal');
}

function openEditProductModal(productId) {
    const prod = adminProducts.find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('editProductId').value = prod.id;
    document.getElementById('prodFormName').value = prod.name;
    document.getElementById('prodFormCategory').value = prod.category;
    document.getElementById('prodFormStock').value = prod.stock;
    document.getElementById('prodFormCostPrice').value = prod.costPrice || Math.round(prod.price * 0.8);
    document.getElementById('prodFormPrice').value = prod.price;
    document.getElementById('prodFormImage').value = prod.image;

    document.getElementById('modalProductTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Mahsulotni Tahrirlash`;
    openModal('adminProductModal');
}

function saveProductHandler(e) {
    e.preventDefault();
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('prodFormName').value;
    const category = document.getElementById('prodFormCategory').value;
    const stock = parseInt(document.getElementById('prodFormStock').value);
    const costPrice = parseInt(document.getElementById('prodFormCostPrice').value);
    const price = parseInt(document.getElementById('prodFormPrice').value);
    const image = document.getElementById('prodFormImage').value || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";

    if (id) {
        // Edit
        const index = adminProducts.findIndex(p => p.id == id);
        if (index > -1) {
            adminProducts[index] = { ...adminProducts[index], name, category, stock, costPrice, price, image };
            showToast("Mahsulot muvaffaqiyatli tahrirlandi!");
        }
    } else {
        // Create
        const newP = { id: Date.now(), name, category, stock, costPrice, price, image, rating: 5.0, reviewsCount: 1 };
        adminProducts.unshift(newP);
        showToast("Yangi mahsulot qo'shildi!");
    }

    localStorage.setItem('tezkor_admin_products', JSON.stringify(adminProducts));
    renderProductsTable();
    renderDashboardTables();
    closeModal('adminProductModal');
}

function deleteProduct(productId) {
    if (confirm("Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
        adminProducts = adminProducts.filter(p => p.id !== productId);
        localStorage.setItem('tezkor_admin_products', JSON.stringify(adminProducts));
        renderProductsTable();
        renderDashboardTables();
        showToast("Mahsulot o'chirildi");
    }
}

function renderUsersTable(items = adminUsers) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = items.map(u => `
        <tr>
            <td>
                <div style="font-weight: 600;">${u.name}</div>
                <div style="font-size: 11px; color: #64748b;">ID: #${u.id}</div>
            </td>
            <td><span class="card-tag">${u.role}</span></td>
            <td>${u.lastActive}</td>
            <td><code>${u.ip}</code></td>
            <td>
                ${u.online 
                    ? `<span class="badge-status success"><span class="status-dot green"></span> Online</span>`
                    : `<span class="badge-status info">Offline</span>`
                }
            </td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="btn btn-sm btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="toggleUserStatus(${u.id})"><i class="fa-solid fa-arrows-rotate"></i> Status</button>
                    <button class="btn btn-sm btn-danger" style="padding: 4px 8px; font-size: 11px;" onclick="deleteUser(${u.id})"><i class="fa-regular fa-trash-can"></i> O'chirish</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function deleteUser(userId) {
    if (confirm("Ushbu foydalanuvchini o'chirmoqchimisiz?")) {
        adminUsers = adminUsers.filter(u => u.id !== userId);
        renderUsersTable();
        showToast("Foydalanuvchi o'chirildi!");
    }
}

function toggleUserStatus(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (user) {
        user.online = !user.online;
        renderUsersTable();
        showToast(`${user.name} statusi o'zgartirildi!`);
    }
}

function renderLogsList() {
    const list = document.getElementById('activityLogsList');
    if (!list) return;

    list.innerHTML = adminLogs.map(log => `
        <div class="log-item">
            <div class="log-icon" style="background: ${log.bg}; color: ${log.color};">
                <i class="fa-solid ${log.icon}"></i>
            </div>
            <div class="log-content">
                <div class="log-title">${log.title}</div>
                <div class="log-time"><i class="fa-regular fa-clock"></i> ${log.time}</div>
            </div>
        </div>
    `).join('');
}

function filterUsersTable() {
    const query = document.getElementById('userSearchInput').value.toLowerCase();
    const filtered = adminUsers.filter(u => u.name.toLowerCase().includes(query) || u.role.toLowerCase().includes(query));
    renderUsersTable(filtered);
}

function saveUserHandler(e) {
    e.preventDefault();
    const name = document.getElementById('userFormName').value.trim();
    const role = document.getElementById('userFormRole').value;
    const ip = document.getElementById('userFormIp').value.trim();
    const online = document.getElementById('userFormOnline').value === 'true';

    const newUser = {
        id: Math.floor(100 + Math.random() * 900),
        name,
        role,
        lastActive: "Hozirgina",
        ip,
        online
    };

    adminUsers.unshift(newUser);
    renderUsersTable();
    closeModal('adminUserModal');
    showToast("Yangi foydalanuvchi muvaffaqiyatli qo'shildi! 👤");
    e.target.reset();
}

function saveCategoryHandler(e) {
    e.preventDefault();
    const catName = document.getElementById('catFormName').value.trim();
    if (!catName) return;

    const categorySelect = document.getElementById('prodFormCategory');
    if (categorySelect) {
        const opt = document.createElement('option');
        opt.value = catName;
        opt.innerText = catName;
        categorySelect.appendChild(opt);
    }
    const filterSelect = document.getElementById('prodCategoryFilter');
    if (filterSelect) {
        const opt = document.createElement('option');
        opt.value = catName;
        opt.innerText = catName;
        filterSelect.appendChild(opt);
    }

    closeModal('adminCategoryModal');
    showToast(`"${catName}" kategoriyasi muvaffaqiyatli qo'shildi! 📁`);
    e.target.reset();
}

function renderTopSellingTable() {
    const tbody = document.getElementById('topSellingTable');
    if (!tbody) return;

    const topItems = [
        { name: "iPhone 15 Pro Max 256GB", count: 48, revenue: "739,200,000 so'm" },
        { name: "Samsung Galaxy S24 Ultra", count: 32, revenue: "454,400,000 so'm" },
        { name: "MacBook Pro 16 M3 Max", count: 14, revenue: "511,000,000 so'm" },
        { name: "Sony WH-1000XM5 Quloqchin", count: 42, revenue: "180,600,000 so'm" },
        { name: "LG OLED EVO C3 55 TV", count: 18, revenue: "302,400,000 so'm" }
    ];

    tbody.innerHTML = topItems.map((item, index) => `
        <tr>
            <td><strong>#${index + 1}</strong></td>
            <td>${item.name}</td>
            <td><span class="badge-status success">${item.count} ta</span></td>
            <td><strong>${item.revenue}</strong></td>
        </tr>
    `).join('');
}

function exportReportData() {
    showToast("Hisobot CSV formatida yuklab olindi!");
}

function renderTransactionsTable(items = adminTransactions) {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    tbody.innerHTML = items.map(t => `
        <tr>
            <td><strong>${t.id}</strong></td>
            <td>${t.date}</td>
            <td>${t.desc}</td>
            <td><span class="card-tag">${t.category}</span></td>
            <td>
                ${t.type === 'income' 
                    ? `<span class="badge-status success">+ Daromad</span>`
                    : `<span class="badge-status danger">- Xarajat</span>`
                }
            </td>
            <td><strong>${t.type === 'income' ? '+' : '-'}${formatPrice(t.amount)} so'm</strong></td>
            <td><span class="badge-status info">${t.status}</span></td>
            <td>
                <button class="btn btn-sm btn-danger" style="padding: 4px 8px; font-size: 11px;" onclick="deleteTransaction('${t.id}')"><i class="fa-regular fa-trash-can"></i> O'chirish</button>
            </td>
        </tr>
    `).join('');
}

function deleteTransaction(transId) {
    if (confirm("Ushbu tranzaksiyani o'chirishga ishonchingiz komilmi?")) {
        adminTransactions = adminTransactions.filter(t => t.id !== transId);
        renderTransactionsTable();
        calculateAccountingMetrics();
        showToast("Tranzaksiya o'chirildi!");
    }
}

function calculateAccountingMetrics() {
    let grossIncome = 184500000;
    let totalExpenses = 141700000;

    adminTransactions.forEach(t => {
        if (t.type === 'income') grossIncome += t.amount;
        else if (t.type === 'expense') totalExpenses += t.amount;
    });

    const netProfit = grossIncome - totalExpenses;

    const elRev = document.getElementById('finGrossRevenue');
    const elExp = document.getElementById('finExpenses');
    const elProf = document.getElementById('finNetProfit');

    if (elRev) elRev.innerText = `${formatPrice(grossIncome)} so'm`;
    if (elExp) elExp.innerText = `${formatPrice(totalExpenses)} so'm`;
    if (elProf) elProf.innerText = `${formatPrice(netProfit)} so'm`;
}

function openAddTransactionModal() {
    openModal('adminTransactionModal');
}

function saveTransactionHandler(e) {
    e.preventDefault();
    const type = document.getElementById('transFormType').value;
    const desc = document.getElementById('transFormDesc').value;
    const category = document.getElementById('transFormCategory').value;
    const amount = parseInt(document.getElementById('transFormAmount').value);

    const newTrans = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        desc,
        category,
        type,
        amount,
        status: "Muvaffaqiyatli"
    };

    adminTransactions.unshift(newTrans);
    localStorage.setItem('tezkor_admin_transactions', JSON.stringify(adminTransactions));
    renderTransactionsTable();
    calculateAccountingMetrics();
    closeModal('adminTransactionModal');
    showToast("Tranzaksiya muvaffaqiyatli qo'shildi!");
    e.target.reset();
}

function filterTransactionsTable() {
    const val = document.getElementById('transactionTypeFilter').value;
    if (val === 'all') {
        renderTransactionsTable(adminTransactions);
    } else {
        renderTransactionsTable(adminTransactions.filter(t => t.type === val));
    }
}

function handleGlobalSearch() {
    const query = document.getElementById('adminGlobalSearch').value.toLowerCase().trim();
    if (!query) return;

    // Filter products
    const filteredP = adminProducts.filter(p => p.name.toLowerCase().includes(query));
    if (filteredP.length > 0) {
        switchTab('products', document.querySelectorAll('.menu-item')[1]);
        renderProductsTable(filteredP);
    }
}

function saveSettingsHandler(e) {
    if (e) e.preventDefault();
    const newPass = document.getElementById('setAdminPass')?.value.trim();
    if (newPass) {
        localStorage.setItem('tezkor_admin_pass', newPass);
        document.getElementById('setAdminPass').value = '';
        showToast("Yangi admin paroli o'rnatildi va saqlandi! 🔒");
    } else {
        showToast("Barcha tizim va do'kon sozlamalari saqlandi! 💾");
    }
}

function exportDatabaseBackup() {
    const backupData = {
        products: adminProducts,
        transactions: adminTransactions,
        users: adminUsers,
        logs: adminLogs,
        exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `tezkor_market_backup_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast("Tizim zaxira nusxasi (JSON) yuklab olindi! 📥");
}

function resetDatabaseConfirm() {
    if (confirm("Rastdan ham barcha ma'lumotlarni zavod holatiga qaytarmoqchimisiz?")) {
        localStorage.removeItem('tezkor_admin_products');
        localStorage.removeItem('tezkor_admin_transactions');
        showToast("Tizim ma'lumotlari zavod holatiga qaytarildi! 🔄");
        setTimeout(() => location.reload(), 1500);
    }
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
}

function formatPrice(num) {
    return num.toLocaleString('uz-UZ');
}

function showToast(msg) {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
