import Comparison from "../comparisonComponent";

export default async function ComparisonC ({
    params,
  }: {
    params: Promise<{ show_id: number }>
  }) {
    const { show_id } = await params;

    return (
        <>
            <Comparison show_id={show_id}/>
        </>
    )
    
};

