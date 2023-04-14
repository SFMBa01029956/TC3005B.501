import React from 'react'
import Link from 'next/link'
import {
    Sidebar,
    Menu,
    MenuItem
} from 'react-pro-sidebar';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import styles from '@/styles/sidebar.module.css'

const NewAutomotiveGroupSidebar = ({collapsed, toggled, handleToggleSidebar, handleCollapsedChange}) => {

return (
    <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        style={{height: '100vh'}}
    >
        <div className='sidebar_header'>
            <Menu iconShape='circle'>
                {collapsed ? (
                    <MenuItem 
                        icon={<FaAngleDoubleRight/>}
                        onClick={handleCollapsedChange}/>
                ) : (
                    <MenuItem
                        suffix={<FaAngleDoubleLeft/>}
                        onClick={handleCollapsedChange}
                    >
                    <div>
                        <img src='/sidebar_swivel_logo.svg'/>
                    </div>
                    </MenuItem>
                )}
            </Menu>
        </div>
        <div>
            <Menu>
                <MenuItem icon={<img src='/sidebar_profile_icon_2.svg'/>}>
                    <b className={styles.name}>Grupo A.</b>
                    <div className={styles.name}>grupo.a@demo.com</div>
                </MenuItem>
                <MenuItem icon={<img src='/sidebar_settings_icon.svg'/>} component={<Link href='/new_automotive_group/settings'/>}>
                    Ajustes del perfil
                </MenuItem>
                <MenuItem icon={<img src='/sidebar_docs_icon.svg'/>} component={<Link href='/new_automotive_group/docs'/>}>
                    Documentos
                </MenuItem>
                <MenuItem icon={<img src='/sidebar_help_icon.svg'/>}>Ayuda</MenuItem>
            </Menu>
        </div>
        <div className='sidebar-footer'>
            <div className='sidebar-btn-wrapper' style={{ padding: '16px'}}>
                <Link href='/auth/login'>
                    <span>Cerrar sesión</span>
                </Link>
            </div>
        </div>
    </Sidebar>
)
}
export default NewAutomotiveGroupSidebar;