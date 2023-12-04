import React from 'react';
import classes from './admin.module.css';
import AdminHeader from './adminHeader';
import AddTag from "./ReqForms/AddTag";
import AddComix from "./ReqForms/AddComix";
import DeleteComix from "./ReqForms/DeleteComix";
import EditComix from "./ReqForms/EditComix";

const styles = {
    transform: 'scaleX(-1)'
};
const Admin = () => {
    return (
        <div className={classes.container}>
            <AdminHeader/>
            <div className={classes.content}>
                <div>
                    <AddTag></AddTag>
                    <AddComix></AddComix>
                </div>
                <div>
                    <img src="/4.png" alt="" className={classes.adminRightColumnIMG}/>
                </div>
            </div>
            <div className={classes.content}>
                <div>
                    <div>
                        <EditComix></EditComix>
                        <DeleteComix></DeleteComix>
                    </div>
                </div>
                <div>
                    <img src="/2.png" alt="" style={styles} className={classes.adminRightColumnIMG}/>
                </div>
            </div>

        </div>
    );
};

export default Admin;
