import { getPDPLAssessment } from "./actions";
import PDPLDashboard from "./PDPLDashboard";

export const dynamic = "force-dynamic";

export default async function PDPLPage() {
  const { assessment, organizationId, entityType } = await getPDPLAssessment();

  const initialAnswers = (assessment?.answersJson as Record<string, boolean>) || {};
  const initialScore = assessment?.score || 0;

  return (
    <PDPLDashboard 
      initialAnswers={initialAnswers} 
      organizationId={organizationId} 
      initialScore={initialScore}
      entityType={entityType}
    />
  );
}
