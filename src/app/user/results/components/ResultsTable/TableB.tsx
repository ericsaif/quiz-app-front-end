import Link from "next/link";
import { ReadResult } from "../../../../../../Models/UserModels/ResultsModels/ReadResult";

const TableB = (props:{
    UsersResultsData: ReadResult[]
}) =>{
    const { UsersResultsData } = props

    return UsersResultsData.map((test: ReadResult) => (
        <tr key={`row-in-an-users-results-table-${test.id}`}>
            <th scope="row">
                <Link href={`/user/results/${test.id}`}>
                    {test.id}
                </Link>
            </th>
            <td>
                {test.overAllResult}
            </td>
        </tr>
    ));
}

export default TableB