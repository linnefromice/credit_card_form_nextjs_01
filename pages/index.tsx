import { NextPage } from 'next';
import Layout from "../components/Layout";
import Register from "../components/card/Register";

const IndexPage: NextPage = () => (
  <Layout title="Credit Card Management">
    <Register />
  </Layout>
);

export default IndexPage;
