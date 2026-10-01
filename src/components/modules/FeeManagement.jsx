import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  CreditCard,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Printer
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';
import { Modal } from '../ui/Modal';
import { analyticsData } from '../../data/initialData';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const FeeManagement = () => {
  const { fees, updateFeeStatus } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleMarkPaid = (id) => {
    updateFeeStatus(id, 'Paid');
    addToast(`Marked fee invoice as PAID for record ${id}`, 'success', 'Payment Received');
  };

  const handleViewInvoice = (fee) => {
    setActiveInvoice(fee);
    setIsInvoiceModalOpen(true);
  };

  const filteredFees = fees.filter(f =>
    f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Fees & Finance Operations</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tuition fee collection status, pending dues, financial reports, and downloadable receipts.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Expected Tuition" value="$4.2M" change="Fall 2026" changeType="positive" icon={DollarSign} color="blue" description="Semester 6 Total" />
        <StatCard title="Total Collected" value="$3.86M" change="92% Collected" changeType="positive" icon={CheckCircle2} color="emerald" description="Deposited Funds" />
        <StatCard title="Pending Outstanding" value="$340K" change="8% Outstanding" changeType="negative" icon={AlertCircle} color="amber" description="Overdue Notifications" />
      </div>

      {/* Monthly Collection Chart */}
      <Card>
        <CardHeader>
          <CardTitle icon={CreditCard}>Monthly Tuition Collection Trend ($)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData.monthlyFeeCollection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="feeColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
              <Area type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#feeColor)" name="Collected ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle icon={FileText}>Student Fee Ledger & Invoices</CardTitle>
          <div className="w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Total Tuition</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Pending Dues</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs font-medium">
              {filteredFees.map(fee => (
                <tr key={fee.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{fee.studentName}</div>
                    <div className="text-[10px] text-slate-400">{fee.studentId}</div>
                  </td>
                  <td className="py-3 px-4">{fee.department}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{fee.totalFee}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{fee.paidFee}</td>
                  <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">{fee.pendingFee}</td>
                  <td className="py-3 px-4">
                    <Badge variant={fee.status === 'Paid' ? 'emerald' : fee.status === 'Overdue' ? 'rose' : 'amber'} size="sm">
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="outline" size="sm" icon={FileText} onClick={() => handleViewInvoice(fee)}>
                        Invoice
                      </Button>
                      {fee.status !== 'Paid' && (
                        <Button variant="success" size="sm" onClick={() => handleMarkPaid(fee.id)}>
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="Tuition Fee Statement Receipt">
        {activeInvoice && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">SmartCampus University</h3>
                <p className="text-[10px] text-slate-400">Official Student Account Ledger</p>
              </div>
              <Badge variant={activeInvoice.status === 'Paid' ? 'emerald' : 'amber'} size="lg">
                {activeInvoice.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p><span className="font-semibold text-slate-500">Student Name:</span> {activeInvoice.studentName}</p>
              <p><span className="font-semibold text-slate-500">Student ID:</span> {activeInvoice.studentId}</p>
              <p><span className="font-semibold text-slate-500">Department:</span> {activeInvoice.department}</p>
              <p><span className="font-semibold text-slate-500">Due Date:</span> {activeInvoice.dueDate}</p>
            </div>

            <div className="space-y-2 border-t border-b py-3 border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span>Tuition Fees (Semester 6)</span>
                <span className="font-bold">{activeInvoice.totalFee}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Amount Deposited</span>
                <span>{activeInvoice.paidFee}</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400 font-bold">
                <span>Remaining Balance</span>
                <span>{activeInvoice.pendingFee}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" icon={Printer} onClick={() => window.print()}>Print Invoice</Button>
              <Button variant="primary" onClick={() => setIsInvoiceModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
