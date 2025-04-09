import { TableHead, TableHeader, TableRow } from "../ui/table";

const TableHeaderComponent: React.FC = () => {
    return <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">Done</TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead className="w-[100px]">Importance</TableHead>
            <TableHead className="w-[150px]">Limit Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
    </TableHeader>
}   

export default TableHeaderComponent;