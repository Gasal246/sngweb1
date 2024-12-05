import React, { useEffect, useState } from "react";
import { Col, Row, Card, OverlayTrigger, Tooltip, Modal, Button, Accordion, Breadcrumb } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { ADD_GET_MEALITEM_API, ADD_GET_MEALPACKAGE_API, GET_MEALPACKAGE_ITEM_API } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MealcomboData } from "../../constants/strings";

export default function Mealcombo() {
   const [openModal, setOpenModal] = useState(false);
   // const [isEdit, setIsEdit] = useState(false);
   const [mealList, setMealList] = useState([]);
   // const [ids, setIDS] = useState('');
   const [comboData, setComboData] = useState([])
   const [categoryData, setCategoryData] = useState([])
   const [day, setDay] = useState('')
   const [categoryName, setCategoryName] = useState('')
   const [sendData, setSendData] = useState([])

   const _USER = useSelector(e => e?.common);
   const api = useApi();

   // const { } = useForm({
   //    defaultValues: {},
   //    shouldUnregister: true,
   //    mode: 'onChange',
   // });



   useEffect(() => {
      if (_USER?.role?.length) {
         getCategoryList()
         getMealList()
         getList()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [_USER?.role])

   useEffect(() => {
      CatgoryObj(categoryData)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [categoryData?.length > 0])

   let packID = +window.location.pathname.split('/')[2]

   const getList = async () => {
      const { data, error } = await api.get(GET_MEALPACKAGE_ITEM_API + "/" + packID);
      if (data) {
         if (Object.keys(data.data.list.package_items).length === 0) {
            getCategoryList()
         }
         else {
            setComboData(data.data.list)
         }
      }
      else {

         toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
         });
      }
   }


   const getCategoryList = async () => {
      const { data, error } = await api.get(ADD_GET_MEALPACKAGE_API + "/" + packID);
      if (data) {
         let newCategoryData = []
         data?.data?.list.category.filter((element) => {
            return newCategoryData.push({ categoryInfo: element, data: [] })
         });
         newCategoryData.sort((a, b) => (a.id > b.id) ? 1 : -1)
         setCategoryData(newCategoryData)

         let Package = []
         data?.data?.list.category.filter((element) => {
            return Package.push({
               category_id: element.id, day_1: "", day_2: "", day_3: "", day_4: "", day_5: "", day_6: "", day_7: ""
            })
         });
         console.log("Package", Package);
         setSendData(Package)
      }
      else {
         toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
         });
      }
   }


   const getMealList = async () => {
      const { data, error } = await api.get(ADD_GET_MEALITEM_API);
      if (data) {
         setMealList(data.data.list)
      }
      else {
         toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgrefalser: false,
            autoClose: 2000,
            theme: "colored",
         });
      }
   }


   const CatgoryObj = (catgData) => {
      if (MealcomboData?.package_items) {
         Object.keys(MealcomboData?.package_items).forEach((element) => {
            MealcomboData?.package_items[element].push(...JSON.parse(JSON.stringify(catgData)))
         });
         setComboData(MealcomboData)
      }
   }


   const handleEditClick = (e, name, item) => {
      setOpenModal(true);
      setDay(name)
      setCategoryName(item.categoryInfo.category_name)
   };

   const handleAddmeal = (e, row) => {

      console.log("e", e.target.checked);

      // if (e.target.checked) {

      Object.keys(comboData?.package_items).forEach(function (key, index) {
         if (key === day) {
            Object.keys(comboData?.package_items[key]).forEach(function (keyname, index) {
               if (comboData?.package_items[key][keyname]?.categoryInfo?.category_name === categoryName) {
                  if (comboData?.package_items[key][keyname]?.data.length === 0) {
                     return comboData?.package_items[key][keyname]?.data.push(row)
                  }
                  else {
                     index = comboData?.package_items[key][keyname]?.data.findIndex(item => item.id === row.id)
                     if (index > -1) {
                        return comboData?.package_items[key][keyname]?.data.splice(index, 1)
                     }
                     else {
                        return comboData?.package_items[key][keyname]?.data.push(row)
                     }
                  }
               }
               else {
                  return comboData?.package_items[key][keyname]
               }
            });
         }
         else { return comboData?.package_items[key] }
      });
      // }
      // else {
      //    Object.keys(comboData?.package_items).forEach(function (key, index) {
      //       if (key === day) {
      //          const obj = new Object();
      //          Object.keys(comboData?.package_items[key]).forEach(function (keyname, index) {
      //             if (comboData?.package_items[key][keyname]?.categoryInfo?.category_name === categoryName) {
      //                return comboData?.package_items[key][keyname]?.data.push(row)
      //             }
      //             else {
      //                return comboData?.package_items[key][keyname]
      //             }
      //          });
      //       }
      //       else { return comboData?.package_items[key] }
      //    });
      // }
   }



   const submitHandler = async () => {

      Object.keys(comboData?.package_items).forEach(function (key, index) {
         Object.keys(comboData?.package_items[key]).forEach(function (keyname, index) {
            sendData.map((item, i) => {
               if (item.category_id === comboData?.package_items[key][keyname].categoryInfo.id) {
                  let mealId = comboData?.package_items[key][keyname].data.map((mealitem, i) => {
                     console.log("comboData?.package_items[key][keyname]", mealitem);
                     console.log("comboData?.package_items[key][item]==========", item.key);
                     console.log("comboData?.package_items[key][item]", comboData?.package_items['day_1']);
                     return mealitem.id
                  })
                  item[key] = mealId.toString()
               }
            })
         });
      });

      let req = {
         meal_package_id: packID,
         package: sendData
      }
      console.log("req==============", req);
      // window.location.href = `/meal-package`


      // const { data } = await api.post(GET_MEALPACKAGE_ITEM_API, req);
      // if (data) {
      //    toast.success(data.message ? data.message : data.messages, {
      //       position: toast.POSITION.TOP_RIGHT,
      //       hideProgrefalser: false,
      //       autoClose: 2000,
      //       theme: "colored",
      //    });
      //    setOpenModal(false)
      //    getList()
      // window.location.href = `/meal-package`
      // }
   }

   // const updateData = async () => {

   // let new_formData = {
   //    ...modalData,
   //    meal_category_ids: ids,
   //    created_at: new Date()
   // }

   // const { data } = await api.post(ADD_GET_MEALPACKAGE_API + "/" + updateID, new_formData);

   // if (data) {
   //    toast.success(data.message ? data.message : data.messages, {
   //       position: toast.POSITION.TOP_RIGHT,
   //       hideProgrefalser: false,
   //       autoClose: 2000,
   //       theme: "colored",
   //    });
   //    setOpenModal(false)
   //    getList()
   // }
   // }

   const handleCloseModal = () => {
      setOpenModal(false);
   }


   return (
      <div>
         <Row>
            <Col sm={12} className="col-12">
               <Card className="mt-5">
                  <Card.Header className="d-flex align-items-center justify-content-between flex-wrap">
                     <h3 className="card-title mb-0 w-100">Add Combo Meal</h3>
                     <Breadcrumb className="breadcrumb1">
                        <Breadcrumb.Item className="breadcrumb-item1 active" href="/admin-kitchen-manger">
                           Meal Package
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item1 text-muted">
                           Add Combo Meal
                        </Breadcrumb.Item>
                     </Breadcrumb>
                  </Card.Header>
                  <Card.Body className="defaultaccordion combomeal">
                     <div className="panel-group1" id="accordion1">
                        {console.log("comboData", comboData)}
                        {Object.keys(comboData).length > 0 &&
                           Object.keys(comboData?.package_items).map((keyName, i) => {
                              return (
                                 <div className="panel panel-default mb-4">
                                    <Accordion defaultActiveKey={keyName} >
                                       <Accordion.Item eventKey={keyName} key={i} >
                                          <Accordion.Header className="panel-heading1 style2">
                                             <h5 className="fw-semibold mb-0 tim-note">{keyName}</h5>
                                          </Accordion.Header>
                                          <Accordion.Body Collapse="false">
                                             <Row>
                                                {comboData?.package_items[keyName]?.map((item, i) => {
                                                   return (
                                                      <>
                                                         <div className="mb-5 col-lg-6 col-md-6 col-sm-12 " key={i}>
                                                            <div className="border p-0">
                                                               <div className="d-flex align-items-center justify-content-between bg-light-gray p-3">
                                                                  <h3 className="card-title mb-0">{item.categoryInfo.category_name}</h3>
                                                                  <OverlayTrigger placement="top" overlay={<Tooltip >Add</Tooltip>}>
                                                                     <a href="javascript:void(0)" onClick={(e) => handleEditClick(e, keyName, item)} className="line btn-icon text-black">
                                                                        <span>
                                                                           <i className="fe fe-plus"></i>&nbsp;
                                                                        </span>
                                                                        Add Item
                                                                     </a>
                                                                  </OverlayTrigger>
                                                               </div>

                                                               <Card.Body className="p-0">
                                                                  {item.data.length ?
                                                                     <table className="w-100">
                                                                        <thead className="w-100">
                                                                           <tr>
                                                                              <th className="p-2"> Image </th>
                                                                              <th className="p-2"> Name </th>
                                                                              <th className="p-2"> Type </th>
                                                                           </tr>
                                                                        </thead>
                                                                        <tbody className="w-100">
                                                                           <>
                                                                              {item.data?.map((item, i) => {
                                                                                 return (
                                                                                    <tr>
                                                                                       <td className="p-2" width={"60px"}> <img src={item.item_image_url} alt="item" /></td>
                                                                                       <td className="p-2"> {item.item_name} </td>
                                                                                       <td className="p-2"> {item.type} </td>
                                                                                    </tr>
                                                                                 )
                                                                              })}
                                                                           </>

                                                                        </tbody>
                                                                     </table>
                                                                     :
                                                                     <p className="p-5 text-center">No Meal</p>
                                                                  }
                                                               </Card.Body>
                                                            </div>
                                                         </div>
                                                      </>
                                                   )
                                                })}
                                             </Row>
                                          </Accordion.Body>
                                       </Accordion.Item>
                                    </Accordion>
                                 </div>
                              )
                           })}
                        <div className="righttab">
                           <Button type="button" variant="primary" onClick={submitHandler}>Save</Button>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>



         {openModal && (
            <Modal size="xl" show={openModal}>
               <form id="form"
                  // onSubmit={isEdit ? handleSubmit(updateData) : handleSubmit(updateData)} 
                  validate="true">
                  <Modal.Header>
                     <div className="modal-title h4 mb-0">Select Meal Item</div>
                     <Button onClick={handleCloseModal} className="btn-close" variant="">
                        <i className="fa fa-times fs-6"></i>
                     </Button>
                  </Modal.Header>
                  <Modal.Body className="p-5 combomeal_popup">
                     <Row >
                        {console.log("mealList", mealList)}
                        {mealList?.map((item, i) => {
                           return (
                              <>
                                 <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={i}>
                                    <input type="checkbox" id={item.id} style={{ display: "none" }} onClick={(e) => handleAddmeal(e, item)} />
                                    <label htmlFor={item.id} className="w-100 ">
                                       <div className="thumbnail">
                                          <img src={item.item_image_url} alt={item.item_name} className="thumbimg" />
                                          <div className="caption">
                                             <h4>
                                                <strong>{item.item_name} </strong>
                                             </h4>
                                             <p>
                                                {item.item_description}
                                             </p>
                                          </div>
                                       </div>
                                    </label>
                                 </div>
                              </>
                           )
                        })}
                     </Row>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button type="button" variant="secondary" onClick={handleCloseModal}>Close</Button>
                     <Button type="submit" variant="primary" onClick={handleCloseModal}>Save</Button>
                  </Modal.Footer>
               </form>
            </Modal>
         )}

      </div >
   );
}
