import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => <Spin indicator={<LoadingOutlined className="loading-icon" spin />} />;

export default Loader;
