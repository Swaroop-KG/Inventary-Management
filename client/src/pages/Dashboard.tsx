import { Col, Row } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery, useGetAllProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import DailyChart from '../components/Charts/DailyChart';
import bgtotal from './auth/assets/total1.jpg';
import bgsold from './auth/assets/sold1.jpg';
import bgrev from './auth/assets/revenue.webp';
import bgout from './auth/assets/out2.avif';

const Dashboard = () => {
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: allProducts, isLoading: isLoadingAllProducts } = useGetAllProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  if (isLoading && isLoading1) return <Loader />;
  if (isLoadingAllProducts) return <Loader />;

  // Calculate out-of-stock products
  const outOfStockCount = allProducts?.data?.filter((product: any) => product.stock === 0).length || 0;

  return (
    <>
    
      <Row style={{ paddingRight: '1rem' }}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ padding: '.5rem' }}>
          <div className="number-card" style={{backgroundImage: `url(${bgtotal})`,backgroundSize: 'cover',
      backgroundPosition: 'center', }}>
            <h3 style={{fontSize:40,color:'white',}}>Total Stock</h3>
            <h1 style={{color:'white'}}>{products?.data?.totalQuantity || 0}</h1>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ padding: '.5rem' }}>
          <div className="number-card" style={{backgroundImage: `url(${bgsold})`,backgroundSize: 'cover',
      backgroundPosition: 'center', }}>
            <h3 style={{fontSize:35,color:'white',}}>Total Item Sold</h3>
            <h1 style={{color:'white'}}>
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                0
              )}
            </h1>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ padding: '.5rem' }}>
          <div className="number-card"  style={{backgroundImage: `url(${bgrev})`,
      backgroundPosition: 'center', }}>
            <h3 style={{fontSize:35,color:'white',}}>Total Revenue</h3>
            <h1 style={{color:'white'}}>
              ₹
              {yearlyData?.data.reduce(
                (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
                0
              )}
            </h1>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ padding: '.5rem' }}>
          <div className="number-card" style={{ backgroundColor: 'white',backgroundImage: `url(${bgout})`,
      backgroundSize: 'cover',backgroundPosition: 'center', }}>
            <h3 style={{fontSize:35,color:'white',}}>Out of stock</h3>
            <h1 style={{color:'white'}}>{outOfStockCount}</h1>
          </div>
        </Col>
      </Row>
      <div
        style={{
          border: '1px solid gray',
          margin: '1rem',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '.5rem' }}>Daily Sale and Revenue</h1>
        <DailyChart />
      </div>
      <div
        style={{
          border: '1px solid gray',
          margin: '1rem',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '.5rem' }}>Monthly Revenue</h1>
        <MonthlyChart />
      </div>
      
    </>
  );
};

export default Dashboard;
