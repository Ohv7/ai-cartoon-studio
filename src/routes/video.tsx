import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/video')({beforeLoad: () => { throw redirect({to:'/gallery',replace:true}); } });
