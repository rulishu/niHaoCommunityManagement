
export const columnsSearch = () => {
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
