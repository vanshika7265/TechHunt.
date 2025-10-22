import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies || []);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  // Badge color based on company status (example: Active, Pending, Closed)
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Pending': return 'yellow';
      case 'Closed': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-xl shadow-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map(company => (
            <TableRow key={company._id} className="hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.createdAt?.split("T")[0] || '-'}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(company.status || 'Active')}>
                  {company.status || 'Active'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="hover:text-purple-600 transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className='flex items-center gap-2 w-fit cursor-pointer p-1 hover:bg-gray-100 rounded-md'
                    >
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
