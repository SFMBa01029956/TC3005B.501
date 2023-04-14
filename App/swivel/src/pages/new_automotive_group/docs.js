import { ProSidebarProvider } from 'react-pro-sidebar';
import NewAutomotiveGroupSidebar from '@/components/new_automotive_group_sidebar';


export default function Docs () {
  return (
    <>
      <div className='row' id='body-row'>
        {/* Sidebar */}
        <ProSidebarProvider>
          <NewAutomotiveGroupSidebar/>
        </ProSidebarProvider>
        {/* Page */}
        <div className='col py-3'>
          <div>
            Sube tus documentos y espera a que sean aprobados
          </div>
          <div>
            (Doc-state-editbtn table)
          </div>
        </div>
      </div>
    </>
  )
}