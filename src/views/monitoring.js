import React, { useState, useMemo } from 'react';
import { Helmet } from "react-helmet";
import MenuTab from "../components/MenuTab";
import projectStyles from "../css/style.module.css";
import styles from "../css/home.module.css";
import {levels} from "../assets/levels_risks";
import {columns_student} from "../assets/columns_table_student";
import STUDENTS from "../assets/students_fake.json";
import TableContainer from '../components/Table';

const Monitoring = () => {
  const [checkedState, setCheckedState] = useState(new Array(levels.length).fill(false));
  const columns = useMemo(() => columns_student, [])
  const data = useMemo(() => STUDENTS, [])
  
  const [dataset, setDataSet] = useState(data);

  // const updateMyData = (rowIndex, columnId, value) => {
  //   // We also turn on the flag to not reset the page
  //   setSkipPageReset(true)
  //   setData(old =>
  //     old.map((row, index) => {
  //       if (index === rowIndex) {
  //         return {
  //           ...old[rowIndex],
  //           [columnId]: value,
  //         }
  //       }
  //       return row
  //     })
  //   )
  // }

  // const resetData = () => setData(originalData)

  const FilterDataName = (prompt) => {
    let final = data.filter(students => {
        return(
          students.
            first_name.toLowerCase().includes(prompt.toLowerCase()) || students.last_name.toLowerCase().includes(prompt.toLowerCase()) || students.id.toLowerCase().
            includes(prompt.toLowerCase())
          );
      }
    );
    setDataSet(final)
  }

  const FilterDataProgram = (prompt) => {
    let final = data.filter(students => {
          return(
            students.program.toLowerCase().includes(prompt.toLowerCase())
            );
        }
      );
    setDataSet(final)
  }

  const FilterDataRisk = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
                                                   index === position ? !item : item
                                                );
    
    let final = data.filter(students =>{
          let high_risk = updatedCheckedState[0];
          let med_risk = updatedCheckedState[1];
          let low_risk = updatedCheckedState[2];
          let selected = false;
          
          if (high_risk===false && med_risk===false && low_risk===false){
            return true;
          }else{
            if (high_risk){ selected = selected || students.risk>69}
            if (med_risk) { selected = selected || (students.risk>33 && students.risk<=69)}
            if (low_risk) { selected = selected || students.risk<=33}
            return selected;
        }
        }
      );
    console.log(final)
    setCheckedState(updatedCheckedState)
    setDataSet(final)

    // let test = data.filter(students => {
    //     return(
    //       students.
    //         program.
    //         toLowerCase().
    //         includes(prompt.toLowerCase())
    //       );
    //   }
    // );
    // setDataSet(test)
  }

  return (
    <div className={styles["container"]}>
      <Helmet>
        <title>Monitoring Students</title>
        <meta property="og:title" content="Monitoring Students" />
      </Helmet>
      <header className={styles["Header"]}>
        <div className={styles["menu_containers"]}>
          <MenuTab menu="Monitoring"></MenuTab>
          <MenuTab menu="Collecting"></MenuTab>
          <MenuTab menu="Reporting"></MenuTab>
        </div>
        <div className={styles["menu_containers"]}>
          <img
            alt="profile"
            src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&amp;ixlib=rb-1.2.1&amp;h=1000"
            className={styles["image_profile"]}
          />
          <span className={styles["text_profile"]}>User Name</span>
        </div>
      </header>
      <section className={styles["section"]}>
        <h2 className={projectStyles["heading2"]}>Monitoring Students</h2>
        <div className={styles["menu_filter"]}>
          <div margin-bottom={projectStyles["--dl-space-space-unit"]}>
            <span className={`${projectStyles["content"]} `}>
              Enter the information of the student. Also you can select filter
              by program and level of risk
            </span>
          </div>
        </div>
        <section className={styles["menu_filter"]}>
          <label
            htmlFor="search"
            className={`${projectStyles["content"]}`}
            margin-right={projectStyles["--dl-space-space-unit"]}
          >
            Student
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="First name, Last name, Rut, ID"
            className={` ${styles["Input"]} ${projectStyles["input"]} `}
            onInput={(e) => FilterDataName(e.target.value)}
          />
        </section>
        <section className={styles["menu_filter"]}>
          <label
            htmlFor="filter_program"
            className={`${projectStyles["content"]} `}
            margin-right={projectStyles["--dl-space-space-unit"]}
          >
            Filter by
          </label>
          <div className={styles["group_filterby"]}>
            <input
              type="text"
              id="filter_program"
              name="filter_program"
              placeholder="Program: IC, IICG, CA"
              className={` ${styles["Input"]} ${projectStyles["input"]} `}
              onInput={(e) => FilterDataProgram(e.target.value)}
            />
            <div className={styles["group_checkboxes"]}>
              
              {levels.map(({level, name, short}, index) =>{
                return(
                  <div>
                    <input 
                      type="checkbox"
                      id={`risk-checkbox-${name}`}
                      name={name}
                      value={name}
                      checked = {setCheckedState[index]}
                      onChange={()=> FilterDataRisk(index)}
                    />
                    <span id={`label-checkbox-${name}`} key={`label-checkbox-${name}`} className={styles[`label_checkbox_${short}`]}>{level}</span>
                  </div>
                );
                }
              )}
            </div>
          </div>
        </section>
      </section>
      <section className={styles["section"]}>
        <TableContainer 
          columns = {columns}
          data = {dataset}
        />
      </section>
    </div>
  );
};


export default Monitoring;
