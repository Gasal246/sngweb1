import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { statusCheck } from '../../constants/functions';

function PackageList({ data, onRechargeClick }) {
    const handlePackageClick = (packageId) => {
        onRechargeClick(packageId);
    };

    return (
        <>   <Row  className="mt-3">
            {data.map((row) => (
                    <Col key={row.package_id} xs={12} md={6} lg={6} xl={3} className="mb-3">
                        <Card className="w-100" style={{ backgroundColor: '#ffff' }}>
                            <Card.Body className="text-black">
                                <div className="d-flex flex-wrap  justify-content-between align-items-center">
                                    <div>
                                        <strong className='card-validity-text'> Data Speed</strong>
                                    </div>
                                    <strong className='card-validity-text' style={{ fontSize: '19px' }}>    {row.package_speed ? row.package_speed : 'N/A'}
                                    </strong>
                                </div>
                                <div className="">
                                    <span className="card-name-text">{row.package_name ? row.package_name : '-'}</span>
                                </div>
                                <div className=" mb-1">
                                    <strong className="card-validity-text">Validity {row.original_duration ? row.original_duration : 'N/A'} days</strong>
                                </div>
                                <div className="card-border-top">
                                    <div className="d-flex flex-wrap mt-3 justify-content-between">
                                        <div className='flex-grow-1'>
                                            <strong className='card-validity-text' style={{ fontSize: '20px' }}>AED: {row.package_price ? row.package_price : 'N/A'}</strong>
                                        </div>
                                        <button className="btn btn-blue align-items-center" onClick={() => handlePackageClick(row.package_id)}> <span className='mx-4'>Recharge</span>   </button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
            ))}
        </Row>
        </>
    );
}
export default PackageList;