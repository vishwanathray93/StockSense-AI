import { Page, Layout, Card } from "@shopify/polaris";
import AIAnalytics from "../components/AIAnalytics";

export default function AIPage() {

  return (

    <Page title="AI Analytics">

      <Layout>

        <Layout.Section>

          <Card padding="400">

            <AIAnalytics />

          </Card>

        </Layout.Section>

      </Layout>

    </Page>

  );

}