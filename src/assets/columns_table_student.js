export const columns_student = [
  {
    Header: 'Risk',
    accessor: 'risk',
    width: 80,
    disableResizing: true,
    Cell: ({ cell }) => {
      const { value } = cell;

      const pickColor = (value) => {
        let risk = value
        let color = ''

        switch (true) {
          case (risk >= 69):
              color = '#bf2626'
              break;
          case (risk >= 33):
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
          <b><font color= {pickColor(value)}>{value}</font></b>
        </div>
      );
    },
  },  
  {
    Header: 'id',
    accessor: 'id',
    width: 150,
    disableResizing: true,
  },
  
  {
    Header: 'First Name',
    accessor: 'full_name.f',
    width: 140,
    disableResizing: true,
  },
  {
    Header: 'Last Name',
    accessor: 'full_name.l',
    width: 140,
    disableResizing: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
    width: 300,
    disableResizing: true,
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    width: 130,
    disableResizing: true,
  },
  {
    Header: 'Program',
    accessor: 'program',
    width: 430,
    disableResizing: true,
  },
    
]

 