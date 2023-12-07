
// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import MUIDataTable from "mui-datatables";
// import { allUsers, deleteMultiUser, updateUserStatus, deleteUser } from '../../../apiController';


// const View = () => {
//     const [datatableData, setdatatableData] = useState([]);
//     const [baseurl, setbaseurl] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const list=async()=>{
//     setIsLoading(true);
//     await allUsers()
//       .then((response) => {
//         setIsLoading(false);
//         setdatatableData(response.data.info);
//         //  setbaseurl(`${process.env.REACT_APP_API_KEY}/public/`);
//       }) .catch((err) => {
//         if (!err.response.data.isSuccess) {
//           if (err.response.data.status === 401) {
//             toast.error(err.response.data.message);
//             setIsLoading(false);
//           } else {
//             console.log(err.response.data, 'else');
            
//           }
//         }
//       });
//   };
//   useEffect(() => {
//     const redirectSuccess = localStorage.getItem('redirectSuccess');

//     if (redirectSuccess === 'true') {
//       // The value was found in local storage, perform actions as needed
//       toast.success(localStorage.getItem('redirectMessage'), {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });
//       // Remove the value from local storage
//       localStorage.removeItem('redirectSuccess');
//     }
//     list();
//   }, []);
//   const columns = [
//     {
//       name: 'image',
//       label: 'Profile',
//       options: {
//         customBodyRender: (image) =>
//           image ? (
//             <img
//               src={`${process.env.REACT_APP_API_KEY_IMAGE_PATH}${image}`}
//               alt={image}
//               style={{ height: '50px', width: '50px', borderRadius: '50%' }}
//             />
//           ) : (
//             <img src={no_profile} alt={image} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
//           )
//       }
//     },
//     {
//       name: 'name',
//       label: 'Name',
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: 'email',
//       label: 'Email',
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: 'mo_no',
//       label: 'Mobile No',
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: 'status',
//       label: 'Status',
//       options: {
//         filter: true,
//         sort: false,
//         customBodyRender: (_, { rowIndex }) => {
//           const { status, _id } = datatableData[rowIndex];
//           return (
//             <Switch
//               checked={status}
//               onChange={() => {
//                 const data = { id: _id, status: !status };
//                 updateUserStatus(data, _id)
//                   .then(() => {
//                     toast.success('status changed successfully!', {
//                       key: data._id
//                     });
//                     list();
//                   })
//                   .catch(() => {
//                     toast.error('something went wrong!', {
//                       key: data._id
//                     });
//                   });
//               }}
//             />
//           );
//         }
//       }
//     },
//     {
//       name: '_id',
//       label: 'Action',
//       options: {
//         customBodyRender: (value) => {
//           return (
//             <div>
//               <Icons.BarChart
//                 className="insightsIcon"
//                 onClick={() => {
//                   const userdata = datatableData.find((data) => data._id === value);

//                   const currentDate = new Date();
//                   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//                   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
//                   const insightdata = { userid: value, date: formattedDate };

//                   navigate('/user/insights', { state: { userdata: userdata, insightdata: insightdata, imageurl: baseurl } });
//                 }}
//               />
//               <Icons.Edit
//                 className="editIcon"
//                 onClick={() => {
//                   const editdata = datatableData.find((data) => data._id === value);
//                   navigate('/user/manage', { state: { editdata: editdata, imageurl: baseurl } });
//                 }}
//               />
//               <Icons.Delete
//                 className="deleteIcon"
//                 onClick={async () => {
//                   const confirm = await swal({
//                     title: 'Are you sure?',
//                     text: 'Are you sure that you want to delete this user?',
//                     icon: 'warning',
//                     buttons: ['No, cancel it!', 'Yes, I am sure!'],
//                     dangerMode: true
//                   });
//                   if (confirm) {
//                     console.log(value);
//                     deleteUser(value)
//                       .then(() => {
//                         toast.success('deleted successfully!', {
//                           key: value
//                         });
//                         list();
//                       })
//                       .catch(() => {
//                         toast.error('something went wrong!', {
//                           key: value
//                         });
//                       });
//                   }
//                 }}
//               />
//             </div>
//           );
//         }
//       }
//     }
//   ];

//   // const options = {
//   //   filterType: 'checkbox'
//   // };

//   const deleteMultiple = async (index) => {
//     const ids = index.data.map((index1) => datatableData.find((data, index2) => index2 === index1.dataIndex && data._id)._id);
//     const confirm = await swal({
//       title: 'Are you sure?',
//       text: 'Are you sure that you want to delete this users?',
//       icon: 'warning',
//       buttons: ['No, cancel it!', 'Yes, I am sure!'],
//       dangerMode: true
//     });

//     if (confirm) {
//       deleteMultiUser(ids)
//         .then(() => {
//           list();
//           toast.success('Deleted successfully!', {
//             key: ids
//           });
//         })
//         .catch(() => {
//           toast.error('Something went wrong!', {
//             key: ids
//           });
//         });
//     }
//   };

//   const SelectedRowsToolbar = ({ selectedRows, data }) => {
//     return (
//       <div>
//         <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
//           <Icons.Delete />
//         </IconButton>
//       </div>
//     );
//   };

//   const options = {
//     customToolbarSelect: (selectedRows, data) => (
//       <SelectedRowsToolbar selectedRows={selectedRows} data={data} columns={columns} datatableTitle="test" />
//     )
//   };

//   return (
//     <div>
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <ToastContainer />
//           <div className="text-container">
//             <div className="left-text">
//               <Typography variant="h4" size="sm">
//                 Users
//               </Typography>
//             </div>
//             <div className="right-text">
//               <Button
//                 variant="contained"
//                 size="medium"
//                 color="primary"
//                 onClick={() => {
//                   navigate('/user/manage');
//                 }}
//               >
//                 Add User
//               </Button>
//             </div>
//           </div>
//           {isLoading ? (
//             <Grid item xs={12} style={{ textAlign: 'center' }}>
//               <CircularProgress size={26} fullWidth />
//             </Grid>
//           ) : (
//             <MUIDataTable data={datatableData} columns={columns} options={options} />
//           )}
//         </Grid>
//       </Grid>
//     </div>
//   )
// };
// export default View
