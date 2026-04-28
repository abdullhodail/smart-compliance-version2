import { getGovernanceAssessment } from "./actions";
import GovernanceDashboard from "./GovernanceDashboard";

export const dynamic = "force-dynamic";

export default async function GovernanceLitePage() {
  const { assessment, organizationId } = await getGovernanceAssessment();

  const initialAnswers = (assessment?.answersJson as Record<string, boolean>) || {};
  const initialScore = assessment?.score || 0;

  return (
    <GovernanceDashboard 
      initialAnswers={initialAnswers} 
      organizationId={organizationId} 
      initialScore={initialScore}
    />
  );
}
