export const columns_student = [
    {
      Header: 'id',
      accessor: 'id',
      disableSortBy: true,
    },
    {
      Header: 'First Name',
      accessor: 'full_name.f',
    },
    {
      Header: 'Last Name',
      accessor: 'full_name.l',
    },
    {
      Header: 'Program',
      accessor: 'program',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Risk',
      accessor: 'risk',
      Cell: ({ cell }) => {
        const { value } = cell;

        const pickColor = (value) => {
          let risk = value
          let color = ''

          switch (true) {
            case (risk > 69):
                color = '#bf2626'
                break;
            case (risk > 33):
                color = '#32a94c'
                break;
            default:
                color = '#14a9ff'
                break
        }
          return color;
        };

        return (
          <div style={{ textAlign: 'center', fontSize: 18 }}>
            <font color={pickColor(value)}>{value}</font>
          </div>
        );
      },
    },
  ]

 