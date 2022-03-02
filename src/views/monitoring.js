import React, { useState, useMemo } from 'react';
import { Helmet } from "react-helmet";
import HighlightChange from "react-change-highlight";
import MenuTab from "../components/MenuTab";
import projectStyles from "../css/style.module.css";
import styles from "../css/home.module.css";
import {levels} from "../assets/levels_risks";
import {columns_student} from "../assets/columns_table_student";
import STUDENTS from "../assets/students_fake.json";
import TableContainer from '../components/Table';

const Monitoring = () => {
  const [checkedState, setCheckedState] = useState(new Array(levels.length).fill(false));
  const [searchDataName, setDataName] = useState('');
  const [filterBy, steFilterBy] = useState('');
  const columns = useMemo(() => columns_student, [])
  const data = useMemo(() => STUDENTS, [])
  const [totalResult, setResult] = useState(data.length)
  const refResult = React.createRef();
  const [dataset, setDataSet] = useState(data);

  const updateTable = (search, filter, checked) => {

    let final = data.filter(students => {
      let test_filter = true;
      if (filter == "Male") {
        test_filter = students.program.toLowerCase().includes(filter.toLowerCase()) || students.gender.toLowerCase() == filter.toLowerCase()
      }
      else {
        test_filter = students.program.toLowerCase().includes(filter.toLowerCase()) || students.gender.toLowerCase().includes(filter.toLowerCase())
      }
      
      const test_search = students.id.toLowerCase().includes(search.toLowerCase()) || students.first_name.toLowerCase().includes(search.toLowerCase()) || students.last_name.toLowerCase().includes(search.toLowerCase()) || students.email.toLowerCase().includes(search.toLowerCase())
      return(
        test_search && test_filter
        );
      }
    );

    let final_post = final.filter(students =>{
      let high_risk = checked[0];
      let med_risk = checked[1];
      let low_risk = checked[2];
      let selected = false;
      
      if (high_risk===false && med_risk===false && low_risk===false){
        return true;
      }else{
        if (high_risk){ selected = selected || students.risk>=69}
        if (med_risk) { selected = selected || (students.risk>=33 && students.risk<69)}
        if (low_risk) { selected = selected || students.risk<33}
        return selected;
    }
    }
  )

    setDataSet(final_post)
    setResult(final_post.length)
  }

  const FilterDataName = (prompt) => {
    updateTable(prompt, filterBy, checkedState)
    setDataName(prompt)
  }

  const FilterDataProgram = (prompt) => {
    updateTable(searchDataName, prompt, checkedState)
    steFilterBy(prompt)
  }

  const FilterDataRisk = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
                                                   index === position ? !item : item
                                                );
    updateTable(searchDataName, filterBy, updatedCheckedState)
    setCheckedState(updatedCheckedState)
    
  }

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const ref1 = React.createRef();
  const ref2 = React.createRef();

  const firstchange = () => {
    setCount(count + 1)
  }

  const countUp = () => {
    firstchange()

    setTimeout(() => {
      setCount2(count + 1);
    }, 1500);
  };

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
              by program and level of risk of dropout. Larger number means high probability of dropping out.
            </span>
          </div>
        </div>
        <section className={styles["menu_filter"]}>
          <label
            htmlFor="search"
            className={`${projectStyles["content"]}`}
            margin-right={projectStyles["--dl-space-space-unit"]}
          >
            Student Information
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="ID, First name, Last name, email"
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
              placeholder="Program or Gender"
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
                    <span id={`label-checkbox-${name}`} key={`label-checkbox-${name}`} className={styles[`label_checkbox_${short}`]} width='400px'>{level}</span>
                  </div>
                );
                }
              )}
            </div>
          </div>
        </section>
      </section>
      <section className={styles["section"]}>
      <div className={styles['group_resultsby']}>
        <div padding='10px'> <span STYLE="font-size:20px"> Total Students found: </span></div>
        <HighlightChange highlightStyle={styles['highlight']} showAfter={100} hideAfter={1000}>
          <b><h3 padding='10px' ref={React.createRef()}> {totalResult}</h3></b>
        </HighlightChange>
      </div>
      <TableContainer 
          columns = {columns}
          data = {dataset}
      />
      </section>
    </div>
  );
};


export default Monitoring;
