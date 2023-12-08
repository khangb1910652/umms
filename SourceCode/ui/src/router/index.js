import { createWebHistory, createRouter } from 'vue-router';
import Trangchu from '@/views/Trangchu.vue';
import Dangnhap from '@/views/Dangnhap.vue';
import Dangky from '@/views/Dangky.vue';
import Nhapthongtin from '@/views/Nhapthongtin.vue';
import Thongtintaikhoan from '@/views/Thongtintaikhoan.vue';
import Danhmuc from '@/views/Danhmuc.vue';
import Test from '@/views/Test.vue';


const routes = [
    {
        path: '/',
        name: 'trangchu',
        component: Trangchu,
    },
    {
        path: '/dangnhap',
        name: 'dangnhap',
        component: Dangnhap,
    },
    {
        path: '/dangky',
        name: 'dangky',
        component: Dangky,
    },
    {
        path: '/nhapthongtin',
        name: 'nhapthongtin',
        component: Nhapthongtin,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
    {
        path: '/thongtintaikhoan',
        name: 'thongtintaikhoan',
        component: Thongtintaikhoan,
    },
    {
        path: '/danhmuc',
        name: 'danhmuc',
        component: Danhmuc,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;