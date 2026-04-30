import { redirect } from "next/navigation";
import { getGovernanceAssessment } from "./actions";
import GovernanceDashboard from "./GovernanceDashboard";

export const dynamic = "force-dynamic";

export default async function GovernanceLitePage() {
  try {
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
  } catch (error) {
    redirect("/dashboard/pdpl");
  }
}
