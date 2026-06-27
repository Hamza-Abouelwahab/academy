import { Head, router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import ClassDetails from './partials/ClassDetails';
import AppLayout from '@/layouts/app-layout';

export default function ClasseDetails({ courses = [] , data }) {
    
    console.log(data);
    return (
        <AppLayout
           breadcrumbs={[
    {
        title: 'Courses Detail',
        href: '/classes',
    },
]}
        >
            <Head title="Classe details" /> 

            {/* //^^ chabab  import your component here tawa7d maycodi hna  khdmo dakchi  fl partials then  importiwh   */}

 <ClassDetails students={data.students} />
        </AppLayout>
    );
}
