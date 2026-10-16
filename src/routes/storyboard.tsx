import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/storyboard')({beforeLoad: () => { throw redirect({to:'/gallery',replace:true}); } });
