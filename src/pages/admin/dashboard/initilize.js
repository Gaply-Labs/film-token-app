import React, { useMemo } from 'react';
import AdminLayout from '../../../container/admin/adminLayout';
import { parseDate, getLocalTimeZone } from '@internationalized/date';

import FormProvider from '../../../components/forms/FormProvider';
import { useForm } from 'react-hook-form';
import CustomDatePicker from '../../../components/forms/CustomDatePicker';
import CustomButton from '../../../components/common/CustomButton';
import { useDateFormatter } from '@react-aria/i18n';

export default function Initilize() {
  let formatter = useDateFormatter({ dateStyle: 'long' });
  const defaultValues = useMemo(
    () => ({
      value: { start: parseDate('2024-04-01'), end: parseDate('2024-04-08') },
      value2: { start: parseDate('2024-05-01'), end: parseDate('2024-05-08') },
    }),
    []
  );

  const methods = useForm({ defaultValues });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    const { value, value2 } = data;
    const { start: start1, end: end1 } = convertDate(value.start, value.end);
    const { start: start2, end: end2 } = convertDate(value2.start, value2.end);

    console.log(start1, end1, start2, end2);
  };
  const convertDate = (date1, date2) => {
    const start = new Date(date1.toDate()).toISOString();
    const end = new Date(date2.toDate()).toISOString();
    return { start, end };
  };
  return (
    <AdminLayout>
      <h1 className="text-white text-xl">Add Initilize </h1>
      <FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <CustomDatePicker name="value" label="First Reveel Data" />
          <CustomDatePicker name="value2" label="Second Reveel Data" />
          <CustomButton type="submit">submit</CustomButton>
        </div>
      </FormProvider>
    </AdminLayout>
  );
}
