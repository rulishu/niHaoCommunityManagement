import { Params } from '@/servers/account-admin';

// eslint-disable-next-line no-unused-vars
export const columnsSearch = (onEdit: (tableType: 'edit', obj: Params) => void) => {
  return [
    {
      title: '商铺编号',
      key: 'parkingNumber',
      props: {
        widget: 'input',
        // initialValue: 'www',
        widgetProps: {
          placeholder: '输入车位编号',
        },
      },
    },
  ];
};
