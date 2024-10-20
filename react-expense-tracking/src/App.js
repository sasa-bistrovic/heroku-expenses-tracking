import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NumericFormat } from 'react-number-format';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import tinycolor from 'tinycolor2';
import chroma from 'chroma-js';
import logo from './logo.png';
import howToUseImage from './how-to-use.jpg';
import freePlanImage from './free-plan.jpg';
import premiumPlanImage from './premium-plan.jpg';
import enterprisePlanImage from './enterprise-plan.jpg';
import { motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';

const steps = [
  "Introduction to Expense Tracking\nIn this project, you'll complete your expense tracking in just 3 simple steps:\n1. Create Tasks\n2. Add Participants (Don’t forget to include yourself!)\n3. Log Expenses\n\nClick Next to begin with Step 1.",
  
//  "Sign Up and Verify Your Email\nAfter registration and email verification, start by creating a Task, then add Participants, and finally record Expenses.\n\nClick Next to learn how to create a Task.",
  
//  "Access the Task Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. Then, click Show Form.\n3. Finally, select Show Task Form.\n\nClick Next to proceed.",
  
  "Step 1: Task Details\nFill out the form with the following information:\n- Task Name: Enter a name for the task.\n- Measuring Unit: Specify the unit for the task (e.g., hours, items).\n- Quantity: Provide the quantity for the task.\n\nClick Next to proceed to Step 2.",
  
//  "Submit the Task\nAfter filling out the details, click Enter to create your Task.\n\nClick Next to learn how to add a Participant.",
  
//  "Access the Participant Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. Click Show Form.\n3. Choose Show Participant Form.\n\nClick Next to continue.",
  
  "Step 2: Participant Details\nEnter the participant information:\n- Participant Name: Enter the name of the participant.\n- Participant Email: Enter their email address.\n\nClick Next to proceed to Step 3.",
  
//  "Submit the Participant\nAfter entering the details, click Enter to add the Participant. The task creator is also the task owner, who is the only one able to modify the task and add participants, while others can only enter expenses.\n\nClick Next to add an Expense.",
  
//  "Access the Expense Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. In the Task List, select the Task and proceed to create an Expense.\n\nClick Next for instructions.",
  
  "Step 3: Expense Details\nLog the expense by entering the following:\n- Expense Description: Describe the expense.\n- Quantity: Enter the quantity associated with the expense.\n\nClick Next to review your page.",
  
//  "Submit the Expense\nAfter entering the details, click Enter to finalize your Expense with its description and quantity.\n\nClick Next to see the final result.",
  
  "Review Your Expense Tracking Page\nYour expense tracking page is ready! It includes all the details you’ve entered.\n\nThat's it – you're all set!"
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

const exampleTable = {
  id: 1,
  titles: ['My Participant Name'],
  headers: ["No.", "Description", "MU", "Expense"],
  rows: [
    [1, 'My Expense Descirption', 'EUR', '500.00'],
  ],
  total: ['', '', 'Total', '500.00'] // The total will appear at the end
};

const exampleTable2 = {
  id: 1,
  titles: ['My Participant Name'],
  headers: ["No.", "Description", "MU", "Expense"],
  rows: [],
  total: ['', '', 'Total', '0.00'] // The total will appear at the end
};

  useEffect(() => {
//    console.log('Current location:', location.pathname);
  }, [location, navigate]);

const Page23 = () => {
  if (location.pathname !== '/Home') {
    //console.log('Navigating to /Home');
    navigate('/Home');
  }
};


  useEffect(() => {
    const handlePopState = () => {
      // Refresh the page when back button is clicked
      setShowModal(false);
    };

    // Listen for back navigation
    window.addEventListener('popstate', handlePopState);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  const [isOpen, setIsOpen] = useState(false); // Dropdown menu open/close state
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [activePage, setActivePage] = useState('homepage'); // Currently active page
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomLevel2, setZoomLevel2] = useState(1);
  const [zoomLevel3, setZoomLevel3] = useState(1);
  const [zoomLevel4, setZoomLevel4] = useState(1);
  const [widthLevel1, setWidthLevel1] = useState("40%");
  const [widthLevel2, setWidthLevel2] = useState("70%");
  const [widthLevel3, setWidthLevel3] = useState("35px");
  const [widthLevel4, setWidthLevel4] = useState("16px");
  const [widthLevel5, setWidthLevel5] = useState("300px");
  const [topLeftTableTop, setTopLeftTableTop] = useState("110px");
  const [topCenteredTableTop, setCenteredTableTop] = useState("450px");
  const [topCenteredTable2Top, setCenteredTable2Top] = useState("100px");
  const [topTableContainerTop, setTableContainerTop] = useState("200px");
  const [fontSize, setFontSize] = useState('18px');
  const [topValue1, setTopValue1] = useState('-15%');
  const [topValue2, setTopValue2] = useState('-25%');
  const [topValue3, setTopValue3] = useState('-50%');
  const [topValue4, setTopValue4] = useState('115%');
  const [topValue5, setTopValue5] = useState('125%');
  const [topValue6, setTopValue6] = useState('150%');


    const [colors, setColors] = useState({
        evenRowColor1: '',
        oddRowColor1: '',
        evenTextColor1: '',
        oddTextColor1: '',
        evenRowColor2: '',
        oddRowColor2: '',
        evenTextColor2: '',
        oddTextColor2: '',
        evenRowColor3: '',
        oddRowColor3: '',
        evenTextColor3: '',
        oddTextColor3: ''
    });

    useEffect(() => {
        const evenRowColor1 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor1 = getAdjustedColor(evenRowColor1, 20);
        const evenTextColor1 = getTextColor(evenRowColor1);
        const oddTextColor1 = getTextColor(oddRowColor1);

        const evenRowColor2 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor2 = getAdjustedColor(evenRowColor2, 20);
        const evenTextColor2 = getTextColor(evenRowColor2);
        const oddTextColor2 = getTextColor(oddRowColor2);

        const evenRowColor3 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor3 = getAdjustedColor(evenRowColor3, 20);
        const evenTextColor3 = getTextColor(evenRowColor3);
        const oddTextColor3 = getTextColor(oddRowColor3);

        setColors({
            evenRowColor1,
            oddRowColor1,
            evenTextColor1,
            oddTextColor1,
            evenRowColor2,
            oddRowColor2,
            evenTextColor2,
            oddTextColor2,
            evenRowColor3,
            oddRowColor3,
            evenTextColor3,
            oddTextColor3
        });
    }, []);

  const updateZoomLevel = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      // Mobile: screen width <= 768px
      setZoomLevel(0.25); // Example: 80% zoom
      setZoomLevel2(0.65);
      setZoomLevel3(0.70);
      setZoomLevel4(0.80);
      setWidthLevel1("70%");
      setWidthLevel2("90%");
      setWidthLevel3("60px");
      setWidthLevel4("11px");
      setWidthLevel5("245px");
      setTopLeftTableTop("365px");
      setCenteredTableTop("825px");
      setCenteredTable2Top("365px");
      setTableContainerTop("465px");
      setFontSize('24px');
      setTopValue1('-10%');
      setTopValue2('-20%');
      setTopValue3('-30%');
      setTopValue4('110%');
      setTopValue5('120%');
      setTopValue6('130%');
    } else if (width <= 1024) {
      // Tablet: screen width > 768px and <= 1024px
      setZoomLevel(0.50); // Example: 100% zoom
      setZoomLevel2(0.75);
      setZoomLevel3(0.80);
      setZoomLevel4(0.90);
      setWidthLevel1("55%");
      setWidthLevel2("85%");
      setWidthLevel3("50px");
      setWidthLevel4("12px");
      setWidthLevel5("260px");
      setTopLeftTableTop("200px");
      setCenteredTableTop("650px");
      setCenteredTable2Top("200px");
      setTableContainerTop("300px");
      setFontSize('21px');
      setTopValue1('0%');
      setTopValue2('0%');
      setTopValue3('0%');
      setTopValue4('100%');
      setTopValue5('100%');
      setTopValue6('100%');
    } else {
      // Desktop: screen width > 1024px
      setZoomLevel(1); // Example: 120% zoom
      setZoomLevel2(1);
      setZoomLevel3(1);
      setZoomLevel4(1);
      setWidthLevel1("30%");
      setWidthLevel2("60%");
      setWidthLevel3("35px");
      setWidthLevel4("16px");
      setWidthLevel5("330px");
      setTopLeftTableTop("100px");
      setCenteredTableTop("450px");
      setCenteredTable2Top("100px");
      setTableContainerTop("200px");
      setFontSize('18px');
      setTopValue1('-15%');
      setTopValue2('-25%');
      setTopValue3('-50%');
      setTopValue4('115%');
      setTopValue5('125%');
      setTopValue6('150%');
    }
  };

  const getAdjustedColor = (color, amount) => {
    return tinycolor(color).lighten(amount).toString();
  };

  const getTextColor = (bgColor) => {
    const lightenedColor = getAdjustedColor(bgColor, 10);
    const luminance = chroma(lightenedColor).luminance();
    return luminance > 0.5 ? 'black' : 'white';
  };

const getRandomLightColor = () => {
  // Define the range for light colors by limiting the RGB values
  const getRandomChannelValue = () => Math.floor(Math.random() * 128) + 128; // Generates a value between 128 and 255

  const r = getRandomChannelValue();
  const g = getRandomChannelValue();
  const b = getRandomChannelValue();

  return `rgb(${r}, ${g}, ${b})`;
};


const pageStyle2 = {
  minHeight: '100%', // Ensure page takes full height
  zoom: zoomLevel2,
  width: '100%',
  zoom: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  backgroundColor: 'white',
  padding: '20px',
  boxSizing: 'border-box',
};

const tableContainerStyle = {
  fontSize: widthLevel4,
  padding: '0px', // Remove extra padding
  margin: '0px',  // Remove extra margin
  width: '100%',  // Ensure containers are full width to align tables correctly
  display: 'flex',
  justifyContent: 'center', // Center tables horizontally
};

const tableStyle2 = {
  borderSpacing: '0',
  padding: '0',
  width: '45%', // Ensure all tables have the same width if needed
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  app: {
    textAlign: 'center',
    paddingTop: '80px', // Space for fixed header
  },
  hero: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '80px 20px', // Adjusted padding
    marginBottom: '50px',
  },
  heroH1: {
    fontSize: '2.5rem',
  },
  heroP: {
    fontSize: '1.2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    backgroundColor: 'white',
    marginBottom: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionAlt: {
    backgroundColor: '#e0e0e0',
  },
  sectionImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  sectionContent: {
    maxWidth: '500px',
    textAlign: 'center',
  },
  sectionContentH2: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  sectionContentP: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  price: {
    fontSize: '1.3rem',
    color: '#4caf50',
    fontWeight: 'bold',
  },
  footer: {
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '1rem',
  },
  topLeftTable: {
    position: 'absolute',
    top: topLeftTableTop,
    left: '20px',
    width: '550px', // Adjust width as needed
    backgroundColor: '#ccffcc',
  },
  centeredTable: {
    position: 'absolute',
    fontSize: fontSize,
    top: topCenteredTableTop,
    width: '25%', // Let the table width adjust automatically
    margin: '0px 0px', // Center horizontally
    backgroundColor: '#ffcccc',
  },
  centeredTable2: {
    position: 'absolute',
    fontSize: fontSize,
    top: topCenteredTable2Top,
    width: '25%', // Let the table width adjust automatically
    margin: '0px 0px', // Center horizontally
    backgroundColor: '#ffcccc',
  },
  leftContainer: {
    width: '100%', // Ensure the container takes up full width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginLeft: '0px', // No left margin needed
    height: '50vh', // Ensure the container takes up full height
  },
  tableContainer: {
    position: 'absolute',
    fontSize: fontSize,
    top: topTableContainerTop,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    margin: '20px auto',
  },
  howToUseSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  imageContainer: {
    margin: '20px 0'
  },
  image: {
    maxWidth: '100%',
    height: 'auto'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#6e8efb',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  bgMario: {
    backgroundColor: '#ffcccc',
    flex: 1,
    margin: '0 0px',
  },
  bgMarioThead: {
    backgroundColor: '#ff9999',
  },
  bgJosipa: {
    backgroundColor: '#ccffcc',
    flex: 1,
    margin: '0 0px',
  },
  bgJosipaThead: {
    backgroundColor: '#99ff99',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: '0 0px',
  },
  bgWhiteThead: {
    backgroundColor: '#ffffff',
  },
  bgIvana: {
    backgroundColor: '#ccccff',
    flex: 1,
    margin: '0 0px',
  },
  bgIvanaThead: {
    backgroundColor: '#9999ff',
  },
  bgMarta: {
    backgroundColor: '#ffffcc',
    flex: 1,
    margin: '0 0px',
  },
  bgMartaThead: {
    backgroundColor: '#ffff99',
  },
};

const Section = ({ title, description, imageUrl, price, alt }) => {
  return (
    <motion.div
      style={{
        ...styles.section,
        ...(alt && styles.sectionAlt),
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={imageUrl} alt={title} style={styles.sectionImage} />
      <div style={styles.sectionContent}>
        <h2 style={styles.sectionContentH2}>{title}</h2>
        <p style={styles.sectionContentP}>{description}</p>
        {price && <p style={styles.price}>Price: {price}</p>}
      </div>
    </motion.div>
  );
};

const Section2 = ({ title, description, imageUrl, price, alt }) => {
  return (
    <motion.div
      style={{
        ...styles.section,
        ...(alt && styles.sectionAlt),
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={imageUrl} alt={title} style={styles.sectionImage} onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          console.log('Changing to homepage');
          handlePageChange('step0');
  }}/>
      <div style={styles.sectionContent}>
        <h2 style={styles.sectionContentH2}>{title}</h2>
        <p style={styles.sectionContentP}>{description}</p>
        {price && <p style={styles.price}>Price: {price}</p>}
      </div>
    </motion.div>
  );
};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    howToUse: false,
    freePlan: false,
    premiumPlan: false,
    enterprisePlan: false,
  });

  const howToUseRef = useRef(null);
  const freePlanRef = useRef(null);
  const premiumPlanRef = useRef(null);
  const enterprisePlanRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const checkVisibility = (ref, key) => {
        if (ref.current) {
          const top = ref.current.getBoundingClientRect().top + scrollY;
          if (scrollY + viewportHeight > top + 100) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
          }
        }
      };

      checkVisibility(howToUseRef, 'howToUse');
      checkVisibility(freePlanRef, 'freePlan');
      checkVisibility(premiumPlanRef, 'premiumPlan');
      checkVisibility(enterprisePlanRef, 'enterprisePlan');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
/*
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
*/

  useEffect(() => {
    // Set zoom level on component mount
    updateZoomLevel();

    // Update zoom level on window resize
    window.addEventListener('resize', updateZoomLevel);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateZoomLevel);
    };
  }, []);


const pageContainer = {
  zoom: zoomLevel3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const tableContainer3 = {
    zoom: zoomLevel2,
    width: widthLevel1,
};

const tableContainer2 = {
    zoom: zoomLevel2,
    width: widthLevel2,
};


const pageContent = {
  zoom: zoomLevel3,
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '5px',
};



const pageStyle = {
  minHeight: '100%', // Ensure page takes full height
  width: '100%',
  zoom: zoomLevel,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align content to the top
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '20px',
  boxSizing: 'border-box',
};



  const [selectedTaskByTask, setSelectedTaskByTask] = useState('');
  const [selectedTaskByUser, setSelectedTaskByUser] = useState('');
  const [selectedTaskByExpense, setSelectedTaskByExpense] = useState('');
  const [tables, setTables] = useState([]);
  const [topLevel, setTopLevel] = useState('0%');
  const [heightLevel, setHeightLevel] = useState('100%');
  const [isDanger, setIsDanger] = useState(false);
  const [isDanger2, setIsDanger2] = useState(false);
  const [isDanger3, setIsDanger3] = useState(false);
  const [isDanger4, setIsDanger4] = useState(false);
  const [isDanger5, setIsDanger5] = useState(false);
  const [isDanger6, setIsDanger6] = useState(false);
  const [isDanger7, setIsDanger7] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasError2, setHasError2] = useState(false);
  const [hasError3, setHasError3] = useState(false);
  const [hasError4, setHasError4] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [limitValue, setLimitValue] = useState('');
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expensePrice, setExpensePrice] = useState("");

  const modalBottomStyles1 = {
    position: 'fixed',
    top: topLevel,
    left: 0,
    right: 0,
    margin: 0,
    zoom: zoomLevel4,
    width: '100%',
    height: heightLevel,
    maxWidth: '100%',
    zIndex: 999,
  };

  const modalBottomStyles2 = {
    position: 'fixed',
    top: '60%',
    left: 0,
    right: 0,
    zoom: zoomLevel4,
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    zIndex: 9999,
  };



  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get("/api/tables")
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tables!", error);
      });
  }, []);

const tableColors = {};

const generateTableColors = (id) => {
  if (!tableColors[id]) {
    const evenRowColor = getRandomLightColor();
    const oddRowColor = getAdjustedColor(evenRowColor, -8);
    const evenTextColor = getTextColor(evenRowColor);
    const oddTextColor = getTextColor(oddRowColor);
    const headerColor = getAdjustedColor(evenRowColor, -16);
    const headerTextColor = getTextColor(headerColor);

    tableColors[id] = {
      evenRowColor,
      oddRowColor,
      evenTextColor,
      oddTextColor,
      headerColor,
      headerTextColor
    };
  }

  return tableColors[id];
};

const stringToLightColor = (str) => {
    // Ensure the input string is a valid 14-digit string (yyyyMMddHHmmss)
    if (!/^\d{14}$/.test(str)) {
        throw new Error('Invalid date-time string format');
    }
    
    // Convert the string to a numeric value
    const numericValue = parseInt(str, 10);
    
    // Use modulus operation to ensure values are within the RGB range (0-255)
    const red = (numericValue % 256);
    const green = ((numericValue >> 8) % 256);
    const blue = ((numericValue >> 16) % 256);

    // Return the color in RGB format
    return `rgb(${red}, ${green}, ${blue})`;
};

const numberToLightColor = (num) => {
  // Normalize the number to a range between 0 and 360
  const hue = (num * 60) % 360;
  return `hsl(${hue}, 100%, 80%)`; // Light color with 80% lightness
};

const integerToLightColor = (id) => {
  // Convert integer to string
  const str = id.toString();
  // Use the string in the color generation function
  return stringToLightColor(str);
};

const evenColor = (id, lightness) => `hsl(${(id * 37 + 180) % 360}, 30%, ${lightness}%)`;  // Prigušena boja za even redove
const oddColor = (id, lightness) => `hsl(${(id * 53 + 220) % 360}, 30%, ${lightness}%)`;   // Prigušena boja za odd redove
const headerColor = (id, lightness) => `hsl(${(id * 71 + 240) % 360}, 30%, ${lightness}%)`; // Prigušena boja za header

const renderTable = (table) => {
  if (!table) {
    return null;
  }
    const headerColor2 = getAdjustedColor(oddColor(table.id+1, 45), 10);
    const oddRowColor = getAdjustedColor(headerColor2,10);
    const evenRowColor = getAdjustedColor(headerColor2,20);
    const evenTextColor = getTextColor(evenRowColor);
    const oddTextColor = getTextColor(oddRowColor);
    const headerTextColor = getTextColor(headerColor2);

  return (
    <table key={table.id} style={{ ...tableContainer2, marginTop: 0, marginBottom: 0 }} className="table table-bordered rounded-corners table-success">
      <thead>
        {table.titles.map((title, i) => (
          <tr key={i}>
            <th colSpan={table.headers.length} style={{ textAlign: 'center', fontSize: '21px', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              {title}
            </th>
          </tr>
        ))}
        <tr>
          {table.headers.map((header, headerIndex) => (
            <th key={headerIndex} style={{ textAlign : headerIndex === 0 ? 'center' : headerIndex === 1 ? 'left' : headerIndex === 2 ? 'center' : 'right', width: headerIndex === 0 ? '10%' : headerIndex === 1 ? '50%' : headerIndex === 2 ? '10%' : '30%', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? evenRowColor : oddRowColor }}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ textAlign: cellIndex === 0 ? 'center' : cellIndex === 1 ? 'left' : cellIndex === 2 ? 'center' : 'right', backgroundColor: rowIndex % 2 === 0 ? evenRowColor : oddRowColor, color: rowIndex % 2 === 0 ? evenTextColor : oddTextColor, padding: 10 }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
        {table.total && (
          <tr>
            <td colSpan={table.headers.length - 1} style={{ textAlign: 'right', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              <b>Total</b>
            </td>
            <td style={{ textAlign: 'right', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              <b>{table.total[table.total.length - 1]}</b>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};


  // Handle page change and close dropdown
  const handlePageChange = (page) => {
    setActivePage(page);
    setIsOpen(false); // Close dropdown when an option is clicked
  };

  // Handle clicks outside of the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks outside of the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [tasksByTask, setTasksByTasks] = useState([]);
  const [tasksByUser, setTasksByUsers] = useState([]);
  const [tasksByExpense, setTasksByExpenses] = useState([]);
  const [section, setSection] = useState('login');
  const [currentPage, setCurrentPage] = useState(1);
  const [intervalPage, setIntervalPage] = useState(1);
  const [timerInterval, setTimerInterval] = useState(2000);
  const [taskByTask, setTaskByTask] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [newTaskByTask, setNewTaskByTask] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [taskByUser, setTaskByUser] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [taskByExpense, setTaskByExpense] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: '',
    balance: 0
  });

const handleNext = () => {
  if (currentStep < steps.length - 1) {
    const nextStep = currentStep + 1; // Calculate next step first
    setCurrentStep(nextStep);
    setActivePage('step' + nextStep); // Use the nextStep here
    if (nextStep === 0) {
      setIntervalPage(1);
    } else if (nextStep === 1) {
      setIntervalPage(3);
    } else if (nextStep === 2) {
      setIntervalPage(3);
    } else if (nextStep === 3) {
      setIntervalPage(3);
    } else if (nextStep === 4) {
      setIntervalPage(20);
    }
    console.log('step' + nextStep + ' ' + intervalPage);
  }
};

// Fix handlePrevious
const handlePrevious = () => {
  if (currentStep > 0) {
    const previousStep = currentStep - 1; // Calculate previous step first
    setCurrentStep(previousStep);
    setActivePage('step' + previousStep); // Use the previousStep here
    if (previousStep === 0) {
      setIntervalPage(1);
    } else if (previousStep === 1) {
      setIntervalPage(3);
    } else if (previousStep === 2) {
      setIntervalPage(3);
    } else if (previousStep === 3) {
      setIntervalPage(3);
    } else if (previousStep === 4) {
      setIntervalPage(20);
    }
    console.log('step' + previousStep + ' ' + intervalPage);
  }
};


  useEffect(() => {
  if (['step0', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9', 'step10', 'step11', 'step12'].includes(activePage)) {
    const interval = setInterval(() => {
      if (activePage === 'step0') {
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: '',
    balance: -1000
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
        setTopLevel('0%');
        setHeightLevel('100%');          
      }
/*
      if (activePage === 'step1') {
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: '',
    balance: -1000
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
        setTopLevel('0%');
        setHeightLevel('100%');          	
      }
*/
      if (activePage === 'step1') {
         if (intervalPage === 3) {
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: '',
    balance: -1000
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(7);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(11);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 12) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 13) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 14) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(15);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 15) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(16);
          setTopLevel(topValue1);
          setHeightLevel(topValue4);
        } else if (intervalPage === 16) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(17);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 17) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(18);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 18) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(19);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 19) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(20);
          setTopLevel(topValue1);
          setHeightLevel(topValue4);
        } else if (intervalPage === 20) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(21);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 21) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(22);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 22) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(23);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 23) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(24);
          setTopLevel(topValue1);
          setHeightLevel(topValue4);
        } else if (intervalPage === 24) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(25);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 25) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(26);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 26) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(27);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 27) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(28);
          setTopLevel(topValue1);
          setHeightLevel(topValue4);
        } else if (intervalPage === 28) {
          setTaskName('My Task Name Examle');
          setSelectedTask('My Task Name Examle');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(29);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 29) {
          setTaskName('My Task Name Examle');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(30);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        } else if (intervalPage === 30) {
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('');
          setTaskName('My Task Name Examle');
          setSelectedTask('My Task Name Examle');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(1000);
          setTopLevel(topValue1);
         setHeightLevel(topValue4);
        }
        }
      if (activePage === 'step2') {
         if (intervalPage === 3) {
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(7);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(11);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setTopLevel(topValue2);
          setHeightLevel(topValue5);
        } else if (intervalPage === 12) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setTopLevel(topValue2);
          setHeightLevel(topValue5);
        } else if (intervalPage === 13) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setTopLevel(topValue2);
          setHeightLevel(topValue5);
        } else if (intervalPage === 14) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(15);
          setTopLevel(topValue2);
          setHeightLevel(topValue5);
        } else if (intervalPage === 15) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(16);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 16) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(17);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 17) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(18);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 18) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(19);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 19) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(20);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 20) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(21);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 21) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(22);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 22) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(23);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 23) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(24);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 24) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(25);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 25) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(26);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        } else if (intervalPage === 26) {
  setTables([exampleTable2]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('My Task Name Examle');
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('My Participant Name');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(1000);
          setTopLevel(topValue3);
          setHeightLevel(topValue6);
        }
        }
      if (activePage === 'step3') {
         if (intervalPage === 3) {
  setTables([exampleTable2]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -1000
  }));
  setSelectedTaskByTask('My Task Name Examle');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(7);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(11);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 12) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 13) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 14) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(15);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 15) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(16);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 16) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(17);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 17) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(18);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 18) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(19);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 19) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(20);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 20) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(true);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(21);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 21) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(22);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 22) {
  setTables([exampleTable]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('My Task Name Examle');
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(true);
          setSelectedTask('My Task Name Examle');
          setExpenseDescription('My Expense Descirption');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1000);
          setTopLevel('0%');
         setHeightLevel('100%');
        }
        }
      if (activePage === 'step4') {
  setTables([exampleTable]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'My Task Name Examle',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('My Task Name Examle');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger7(false);
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1000);
          setTopLevel('0%');
          setHeightLevel('100%');
        }

    }, timerInterval);

    return () => clearInterval(interval); // Clear interval when component unmounts or activePage changes
  } else {
   // setCurrentPage(1);
   // setIntervalPage(1); // Reset intervalPage to 1
  }
    if (activePage === 'expensesdemo') {
      const interval = setInterval(() => {
        if (intervalPage < 44) {
          if (intervalPage !== 1+15 || intervalPage !== 1+16 || intervalPage !== 1+17 || intervalPage !== 1+19 || intervalPage !== 1+20 || intervalPage !== 1+21 || intervalPage !== 1+23 || intervalPage !== 1+24 || intervalPage !== 1+25 || intervalPage !== 1+27 || intervalPage !== 1+28 || intervalPage !== 1+29 || intervalPage !== 1+31 || intervalPage !== 1+32 || intervalPage !== 1+33 || intervalPage !== 1+35 || intervalPage !== 1+36 || intervalPage !== 1+37 || intervalPage !== 1+39 || intervalPage !== 1+40 || intervalPage !== 1+41) {
          setCurrentPage(intervalPage);
        }
          if (intervalPage === 1+15 || intervalPage === 1+16 || intervalPage === 1+17 || intervalPage === 1+19 || intervalPage === 1+20 || intervalPage === 1+21 || intervalPage === 1+23 || intervalPage === 1+24 || intervalPage === 1+25 || intervalPage === 1+27 || intervalPage === 1+28 || intervalPage === 1+29 || intervalPage === 1+31 || intervalPage === 1+32 || intervalPage === 1+33 || intervalPage === 1+35 || intervalPage === 1+36 || intervalPage === 1+37 || intervalPage === 1+39 || intervalPage === 1+40 || intervalPage === 1+41) {
          setCurrentPage(intervalPage);
        }
        }
        if (intervalPage === 48) {
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
        } else {
          if (intervalPage !== 1+15 || intervalPage !== 1+16 || intervalPage !== 1+17 || intervalPage !== 1+19 || intervalPage !== 1+20 || intervalPage !== 1+21 || intervalPage !== 1+23 || intervalPage !== 1+24 || intervalPage !== 1+25 || intervalPage !== 1+27 || intervalPage !== 1+28 || intervalPage !== 1+29 || intervalPage !== 1+31 || intervalPage !== 1+32 || intervalPage !== 1+33 || intervalPage !== 1+35 || intervalPage !== 1+36 || intervalPage !== 1+37 || intervalPage !== 1+39 || intervalPage !== 1+40 || intervalPage !== 1+41) {
          setTimerInterval(2000);
          setIntervalPage(intervalPage + 1); // Increment intervalPage
        }
          if (intervalPage === 1+15 || intervalPage === 1+16 || intervalPage === 1+17 || intervalPage === 1+19 || intervalPage === 1+20 || intervalPage === 1+21 || intervalPage === 1+23 || intervalPage === 1+24 || intervalPage === 1+25 || intervalPage === 1+27 || intervalPage === 1+28 || intervalPage === 1+29 || intervalPage === 1+31 || intervalPage === 1+32 || intervalPage === 1+33 || intervalPage === 1+35 || intervalPage === 1+36 || intervalPage === 1+37 || intervalPage === 1+39 || intervalPage === 1+40 || intervalPage === 1+41) {
          setTimerInterval(500);
          setIntervalPage(intervalPage + 1); // Increment intervalPage
        }

        }
      }, timerInterval); // 0.5 seconds for each page

      return () => clearInterval(interval); // Clear interval when component unmounts or activePage changes
    } else {
       //setCurrentPage(1);        
       //setIntervalPage(1); // Reset intervalPage to 1
    }
  }, [activePage, intervalPage]); // Add intervalPage to the dependency array

const handleTaskChange = (e) => {
  const selectedTask = e.target.value;
  const selectedIndex = e.target.selectedIndex;

  if (selectedTask === "") {
    setSelectedTaskByTask(selectedTask); // Update the state
    resetTaskByTaskForm();
    //console.log("The first option (index 0) is selected");
    // You can handle this case as needed
  } else { 
  setSelectedTaskByTask(selectedTask); // Update the state
  const taskId = findTaskIdByName(selectedTask); // Use the value directly from the event

  if (taskId) {
     updateAndSelectTask(taskId);
       //setTaskByTask(findTaskByTaskByName(selectedTask));
const foundTask = findTaskByTaskByName(selectedTask);

// Format the limitValue before setting it in the state
const formattedLimitValue = new Intl.NumberFormat('en-US', { 
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
}).format(Number(foundTask.limitValue));

// Create a new object with the formatted limitValue
const updatedTask = {
  ...foundTask,
  limitValue: formattedLimitValue
};

// Set the state with the updated task
setTaskByTask(updatedTask);
  } else {
  }
}
};

  const handleUserChange = (e) => {
  const selectedUser = e.target.value;
  const selectedIndex = e.target.selectedIndex;

  if (selectedUser === "") {
    setSelectedTaskByUser(selectedUser); // Update the state
    resetTaskByUserForm();
  } else {
    setSelectedTaskByUser(selectedUser); // Update the state

  const taskId = findTaskIdByNameAndEmail(selectedTaskByTask, selectedUser); // Use the value directly from the event

  console.log(taskId);

  if (taskId) {
     setTaskByUser(findTaskByUserByNameAndEmail(selectedTaskByTask, selectedUser));
  } else {
  }
  }
  };

  const findTaskIdByName = (taskName) => {
    const task = tasksByTask.find(task => task.taskName === taskName);
    return task ? task.id : null;
  };

  const findTaskByTaskByName = (taskName) => {
    const task = tasksByTask.find(task => task.taskName === taskName);
    return task ? task : null;
  };

  const findTaskByUserByNameAndEmail = (taskName, userEmail) => {
    const task = tasksByUser.find(
      (task) => task.taskName === taskName && task.userEmail === userEmail
    );
    return task ? task : null;
  };


  const findTaskIdByCurrent = (current) => {
    const task = tasksByTask.find(task => task.current === current);
    return task ? task.taskName : "";
  };

  const findTaskIdByNameAndEmail = (taskName, userEmail) => {
    const task = tasksByUser.find(
      (task) => task.taskName === taskName && task.userEmail === userEmail
    );
    return task ? task.id : null;
  };

  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTaskParticipant, setShowTaskParticipant] = useState(false); // To toggle tasks and participants
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', unit: '', quantity: '', costDescription: '', cost: '' });
  const [selectedTask, setSelectedTask] = useState('');
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [selectedParticipant, setSelectedParticipant] = useState('');

  const handleShowModal = () => {Page23();setShowTaskParticipant(false);setShowTaskForm(false);setShowParticipantForm(false);setShowModal(true);};
  const handleCloseModal = () => {
    setShowModal(false);
    setShowTaskForm(false);
    setShowParticipantForm(false);
  };

  const handleParticipantInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant({ ...newParticipant, [name]: value });
  };

  const handleDeleteTask = () => {
    const taskId = findTaskIdByName(selectedTaskByTask);
    if (taskId) {
      setTaskIdToDelete(taskId);
      setOpenDialog1(true);
    } else {
      //alert('Task not found or not selected.');
    }
  };

  const handleConfirmDelete1 = () => {
    if (taskIdToDelete) {
      deleteTaskByTask(taskIdToDelete);
      setSelectedTaskByTask(findTaskIdByCurrent(true));
      setOpenDialog1(false);
      setTaskIdToDelete(null);
    }
  };

  const handleCancelDelete1 = () => {
    setOpenDialog1(false);
  };

  const handleDeleteUser = () => {
    const taskId = findTaskIdByNameAndEmail(selectedTaskByTask, selectedTaskByUser);
    if (taskId) {
      setTaskIdToDelete(taskId);  // Sačuvaj taskId za brisanje
      setOpenDialog2(true);        // Otvori dijalog za potvrdu brisanja
    } else {
      //alert('Task not found or not selected.');
    }
  };

  const handleConfirmDelete2 = () => {
    if (taskIdToDelete) {
      deleteTaskByUser(taskIdToDelete); // Pozovi funkciju za brisanje
      setSelectedTaskByTask(findTaskIdByCurrent(true)); // Resetuj selektovani task
      setOpenDialog2(false); // Zatvori dijalog
      setTaskIdToDelete(null);
    }
  };

  const handleCancelDelete2 = () => {
    setOpenDialog2(false); // Zatvori dijalog bez brisanja
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [taskNameA, setTaskNameA] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [editingGroup, setEditingGroup] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [editingTask2, setEditingTask2] = useState(false);
  const [editingExpense, setEditingExpense] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (token && storedUsername && emailRegex.test(storedUsername)) {
      try {
        // Decode token to check its expiration
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token is valid, proceed with fetching data
          handlePageChange('tasks');
          setLoggedInUser(storedUsername);
          fetchTasksByTasks();
          fetchTasksByUsers();
          //fetchTables();
        } else {
          handleLogout();
        }
      } catch (error) {
          handleLogout();
      }
    }
  }, []);

  const handleSelectedpage = (selection) => {
     setUsername('');
     setPassword('');
     setEmail('');
     setResetToken('');
     setNewPassword('');
     setMessage("");
     setSection(selection);
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (Array.isArray(tasksByTask) && tasksByTask.length > 0) {
      tasksByTask
        .filter(task => task.current === true)
        .forEach((task) => {
          setSelectedTaskByTask(task.taskName);
//          setTaskByTask(findTaskByTaskByName(task.taskName));
const foundTask = findTaskByTaskByName(task.taskName);

// Format the limitValue before setting it in the state
const formattedLimitValue = new Intl.NumberFormat('en-US', { 
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
}).format(Number(foundTask.limitValue));

// Create a new object with the formatted limitValue
const updatedTask = {
  ...foundTask,
  limitValue: formattedLimitValue
};

// Set the state with the updated task
setTaskByTask(updatedTask);
        });
    }
  }, [tasksByTask]);

  const fetchTasksByTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/tasks', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSelectedTaskByTask('');
      setTasksByTasks(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tables', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTables(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTasksByUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTasksByUsers(response.data);
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTaskByTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valuetask', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };

  const createTaskByUser = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valueusername', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };

  const createTaskByExpense = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valueexpense', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };



  const updateTaskByTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/tasks/${id}`, taskByTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const updateTaskByUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/users/${id}`, taskByUser, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const updateAndSelectTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/select/${id}`, taskByTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteTaskByTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/task/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const deleteTaskByUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleTaskByTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByTask({ ...taskByTask, [name]: value });
    //console.log("name : "+name+" : value : "+ value);
  };

  const handleTaskByUserInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByUser({ ...taskByUser, [name]: value });
  };

  const handleTaskByExpenseInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByExpense({ ...taskByExpense, [name]: value });
  };

const handleTaskByTaskSubmit = (e) => {
  e.preventDefault();
  const taskId = findTaskIdByName(taskByTask.taskName);

  const numericValue = parseFloat(parseFloat(taskByTask.limitValue).toFixed(2));

  if (numericValue !== 0) {
  if (taskId) {
    updateTaskByTask(taskId); // Use taskId instead of taskByTask.id
  } else {
    // Prepare new task data
    const newTask = {
      ...newTaskByTask,
      taskName: taskByTask.taskName,
      measuringUnit: taskByTask.measuringUnit,
      limitValue: taskByTask.limitValue,
    };

    // Call the API directly with the new task data
    createTaskByTask(newTask);
  }
  }
};


  const handleTaskByUserSubmit = async (e) => {
    e.preventDefault();
    const userId = findTaskIdByNameAndEmail(taskByTask.taskName, taskByUser.userEmail);
    //console.log(userId+" "+taskByTask.taskName+" "+taskByUser.userEmail);
    if (userId) {
      updateTaskByUser(taskByUser.id);
    } else {
    resetNewTaskForm();
    const newTask = {
      ...newTaskByTask,
      userName: taskByUser.userName,
      userEmail: taskByUser.userEmail,
    };
      createTaskByUser(newTask);
    }
  };

  const handleTaskByExpenseSubmit = async (e) => {
    e.preventDefault();
    resetNewTaskForm();
    const newTask = {
      ...newTaskByTask,
      expenseDescription: taskByExpense.expenseDescription,
      expensePrice: taskByExpense.expensePrice,
    };

    const numericValue = parseFloat(parseFloat(taskByExpense.expensePrice).toFixed(2));

    if (numericValue !== 0) {
      createTaskByExpense(newTask);
    }
  };

  const handleCloseTaskModal = () => {
    resetTaskForm();
    setShowTaskModal(false);
  };

  const resetNewTaskForm = () => {
    setNewTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };

  const resetTaskByTaskForm = () => {
    setTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };

  const resetTaskByUserForm = () => {
    setTaskByUser({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };


  const resetTaskForm = () => {
    setTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
    setTaskByUser({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
    setTaskByExpense({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: '',
    balance: 0
    });
    setEditingTask(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const token = response.headers['authorization']?.split(' ')[1];
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setLoggedInUser(username);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          handlePageChange('tasks');
        } else {
          setMessage('Token not received');
        }
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setTasksByTasks([]);
    setTasksByUsers([]);
    setUsername('');
    setPassword('');
    handlePageChange('homepage');
    setMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', {
        email,
        password,
      });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('verification');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/verify?token=${resetToken}`);
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('login');
    } catch (error) {
      console.error('Verification error:', error);
      setMessage('Verification failed.');
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/resend-verification', { email });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('verification');
    } catch (error) {
      console.error('Resend verification error:', error);
      setMessage('Failed to resend verification email.');
    }
  };

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/request-password-reset', { email });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('resetPassword');
    } catch (error) {
      console.error('Password reset request error:', error);
      setMessage('Failed to request password reset.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/reset-password', {
        token: resetToken,
        newPassword,
      });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('login'); 
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Failed to reset password.');
    }
  };

  const Page1 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
              <table style={{ ...styles.centeredTable2, border: 'none', background: 'white' }}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th colSpan="2" style={{ border: 'none' }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page2 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page3 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page4 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page5 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page6 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>


              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page7 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page8 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page9 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page10 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page11 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page11a = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page12 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
            <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>0,00 Kg</td>
                </tr>
              </thead>
            </table>
            </div>
          </div>
  );

  const Page13 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>0,00 Kg</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page14 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page15 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page16 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page17 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page18 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );


  const Page19 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page20 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>80,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>95,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page21 = ({ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>80,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>95,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>50,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

const headingStyle = { marginBottom: '1rem', textAlign: 'center' };

  const lineStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: 'black',
    margin: '4px 0',
  };
/*
  const dropdownItemStyle = {
    display: 'block',
    padding: '10px',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  };
*/
  const containerStyle = {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '300px',
    color: '#fff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '800px',
  };

  const wrapperStyle2 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '800px',
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1.1em',
  };

  const inputStyle = {
    padding: '12px',
    border: '2px solid transparent',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#a777e3',
    boxShadow: '0 0 8px rgba(167, 119, 227, 0.5)',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#fff',
    color: '#6e8efb',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#a777e3',
    color: '#fff',
  };

const errorStyle = { 
  color: '#8B0000',
  marginBottom: '1rem' 
};

const successStyle = { 
  color: '#006400',
  marginBottom: '1rem' 
};
const linksContainerStyle = { marginTop: '1rem', textAlign: 'center' };
const linkStyle = { textDecoration: 'none', color: '#ffffff' };
  // Form Component
  const FormComponent = ({ title, formData, handleInputChange, handleSubmit, error, additionalInputs, links, successMessage }) => {
    return (
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={headingStyle}>{title}</h2>

            {error && <div style={errorStyle}>{error}</div>}
            {successMessage && <div style={successStyle}>{successMessage}</div>}

            <div style={inputGroupStyle}>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
                style={inputStyle}
              />
            </div>

            {additionalInputs}

            <button type="submit" style={buttonStyle}>
              Enter
            </button>

            {links && (
              <div style={linksContainerStyle}>
                {links.map((link, index) => (
                  <div key={index}>{link}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  const FormComponent2 = ({ title, formData, handleInputChange, handleSubmit, error, additionalInputs, links, successMessage }) => {
    return (
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={headingStyle}>{title}</h2>

            {error && <div style={errorStyle}>{error}</div>}
            {successMessage && <div style={successStyle}>{successMessage}</div>}

            {additionalInputs}

            <button type="submit" style={buttonStyle}>
              Enter
            </button>

            {links && (
              <div style={linksContainerStyle}>
                {links.map((link, index) => (
                  <div key={index}>{link}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  // Home/Login Component
  const Home = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);
    try {
      const response = await axios.post('/api/users/login', {
        username: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        const token = response.headers['authorization']?.split(' ')[1];
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', formData.email);
          setLoggedInUser(formData.email);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          handlePageChange('tasks');
        } else {
          setError('Token not received');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
    };

    return (
      <FormComponent
        title="Login"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={null}
links={[
  <Link to="/Registering" style={linkStyle}>
    Don't have an account? Register
  </Link>,
  <Link to="/RequestPasswordReset" style={linkStyle}>
    Forgot your password?
  </Link>,
  <Link to="/SetNewPassword" style={linkStyle}>
    Set a new password
  </Link>,
  <Link to="/VerifyingEmail" style={linkStyle}>
    Email verification
  </Link>,
  <Link to="/ResendVerificationEmail" style={linkStyle}>
    Resend verification token
  </Link>,
        ]}
      />
    );
  };

  // Registration Component
  const Registration = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      repeatPassword: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (formData.password !== formData.repeatPassword) {
        setError('Passwords do not match.');
        return;
      }

    try {
      const response = await axios.post('/api/users/register', {
        email:formData.email,
        password:formData.password,
      });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('verification');
      //setSuccessMessage(response.data);
      if (response.data==='Registered. Check email to verify.') {setSuccessMessage(response.data);}
      if (response.data==='Email already exists.') {setError(response.data);}
    } catch (error) {
      //console.error('Registration error:', error);
      setError(error.response?.data?.message || 'An error occurred during registration.');
    }
    };

    return (
      <FormComponent
        title="Registration"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="repeatPassword" style={labelStyle}>
              Repeat password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              placeholder="Repeat password"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // Setting New Password Component
  const SetNewPassword = () => {
    const [formData, setFormData] = useState({
      token: '',
      newPassword: '',
      repeatNewPassword: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      //const { token, newPassword, repeatNewPassword } = formData;

      if (!formData.token) {
        setError('Please enter token.');
        return;
      }
      if (formData.newPassword !== formData.repeatNewPassword) {
        setError('Passwords do not match.');
        return;
      }

    try {
      const response = await axios.put('/api/users/reset-password', {
        token: formData.token,
        newPassword: formData.newPassword,
      });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('login'); 
      if (response.data==='Password has been reset successfully.') {setSuccessMessage(response.data);}
      if (response.data==='Invalid or expired password reset token.') {setError(response.data);}
    } catch (error) {
      //console.error('Reset password error:', error);
      setError('Failed to reset password.');
    }

    };

    return (
      <FormComponent2
        title="Enter new password"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
        additionalInputs={
          <>
            <div style={inputGroupStyle}>
              <label htmlFor="token" style={labelStyle}>
                Token
              </label>
              <input
                type="text"
                id="token"
                value={formData.token}
                onChange={handleInputChange}
                placeholder="Enter token"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="newPassword" style={labelStyle}>
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New password"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="repeatNewPassword" style={labelStyle}>
                Repeat new password
              </label>
              <input
                type="password"
                id="repeatNewPassword"
                value={formData.repeatNewPassword}
                onChange={handleInputChange}
                placeholder="Repeat new password"
                required
                style={inputStyle}
              />
            </div>
          </>
        }
      />
    );
  };

  // Verifying Email Component
  const VerifyingEmail = () => {
    const [formData, setFormData] = useState({
      verificationCode: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      //const { verificationCode } = formData;

      // Placeholder for verification code validation

    try {
      const response = await axios.get(`/api/users/verify?token=${formData.verificationCode}`);
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('login');
      if (response.data==='Email verified successfully.') {setSuccessMessage(response.data);}
      if (response.data==='Verification failed.') {setError(response.data);}
    } catch (error) {
      //console.error('Verification error:', error);
      //setMessage('Verification failed.');
      setError('Invalid verification token.');
    }
    };

    return (
      <FormComponent2
        title="Email verification"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Verification token
            </label>
            <input
              type="text"
              id="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              placeholder="Enter verification token"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // request Password Reset
  const RequestPasswordReset = () => {
    const [formData, setFormData] = useState({
      email: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

    try {
      const response = await axios.put('/api/users/request-password-reset', { email: formData.email });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('resetPassword');
      //setSuccessMessage(response.data);
      if (response.data==='User not found.') {setError(response.data);}
      if (response.data==='Failed to send password reset email.') {setError(response.data);}
      if (response.data==='Password reset email sent.') {setSuccessMessage(response.data);}
    } catch (error) {
      console.error('Password reset request error:', error);
      setError('Failed to request password reset.');
    }


    };

    return (
      <FormComponent2
        title="Request password reset"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // resend Verification Email
  const ResendVerificationEmail = () => {
    const [formData, setFormData] = useState({
      email: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = async (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

    try {
      const response = await axios.put('/api/users/resend-verification', { email: formData.email });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('verification');
      if (response.data==='User not found.') {setError(response.data);}
      if (response.data==='Failed to resend verification email.') {setError(response.data);}
      if (response.data==='Verification email sent.') {setSuccessMessage(response.data);}
    } catch (error) {
      //console.error('Resend verification error:', error);
      setError('Failed to resend verification email.');
    }

    };

    return (
      <FormComponent2
        title="Resend email verification"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

const Page22 = () => {
    return (
        <>
            <p style={{ fontSize: '20px' }}>&nbsp;</p>
            <p style={{ fontSize: '20px' }}>&nbsp;</p>

            <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th translate="no" style={{ backgroundColor: colors.evenRowColor1, color: colors.evenTextColor1, padding: '10px' }}>
                            Email: {localStorage.getItem('username')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center', translate: 'no', backgroundColor: colors.oddRowColor1, color: colors.oddTextColor1, padding: '10px' }}>
                            <b>Task Name: {taskByTask.taskName}</b>
                        </td>
                    </tr>
                </tbody>
            </table>

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: 'center', backgroundColor: colors.evenRowColor2, color: colors.evenTextColor2, padding: '10px' }}>
                                    Expense Tracking
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="50%" style={{ textAlign: 'left', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>Quantity</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '50%', translate: 'no', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    {tables.map((table, index) => renderTable(table, index))}
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginTop: '0px', marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th width="55%" style={{ backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>Total Procured</b>
                                </th>
                                <th style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue + taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="55%" style={{ backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>Missing</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

const Page24 = () => {
    return (
        <>
            <p style={{ fontSize: '20px' }}>&nbsp;</p>
            <p style={{ fontSize: '20px' }}>&nbsp;</p>

            <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th translate="no" style={{ backgroundColor: colors.evenRowColor1, color: colors.evenTextColor1, padding: '10px' }}>
                            Email: {taskByTask.accountEmail}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center', translate: 'no', backgroundColor: colors.oddRowColor1, color: colors.oddTextColor1, padding: '10px' }}>
                            <b>Task Name: {taskByTask.taskName}</b>
                        </td>
                    </tr>
                </tbody>
            </table>

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: 'center', backgroundColor: colors.evenRowColor2, color: colors.evenTextColor2, padding: '10px' }}>
                                    Expense Tracking
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="50%" style={{ textAlign: 'left', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>Quantity</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '50%', translate: 'no', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    {tables.map((table, index) => renderTable(table, index))}
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginTop: '0px', marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th width="55%" style={{ backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>Total Procured</b>
                                </th>
                                <th style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue + taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="55%" style={{ backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>Missing</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};


  return (
     <>
    <div>
      {/* Container for Logo and Dropdown */}
      <div style={headerStyle}>
{(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || 
  activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || 
  activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || 
  activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || 
  activePage === 'step12') ? (
    
    <Button 
      variant={isDanger ? "success" : "primary"} 
      style={{
        position: 'fixed', 
        fontSize: widthLevel4,
        top: '20px', 
        left: '20px', 
        width: widthLevel5, // Adjust size as needed
        height: '40px'
      }}
    >
      Enter (Tasks, Participants and Expenses)
    </Button>

  ) : (

    loggedInUser ? (
      <Button 
        variant="primary" 
        onClick={handleShowModal} 
        style={{
          position: 'fixed', 
          fontSize: widthLevel4,
          top: '20px', 
          left: '20px', 
          width: widthLevel5, // Adjust size as needed
          height: '40px'
        }}
      >
        Enter (Tasks, Participants and Expenses)
      </Button>
    ) : (
      <>
        <img 
          src={logo} 
          alt="Logo" 
          style={{
            position: 'fixed', 
            top: '20px', 
            left: '20px', 
            width: '200px', // Adjust size as needed
            height: '40px'
          }}
        />
      </>
    )
  )
}

        {/* Hamburger and Dropdown */}
        <div
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 2,
          }}
          onClick={toggleDropdown}
        >
          {/* Hamburger icon */}
          <div>
            <div style={lineStyle}></div>
            <div style={lineStyle}></div>
            <div style={lineStyle}></div>
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '40px',  // Adjust this if you want the dropdown to appear closer or further away from the hamburger icon
                right: '0',
                width: '150px',
                backgroundColor: 'white',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                zIndex: 1,
              }}
          >
{(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || 
  activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || 
  activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || 
  activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || 
  activePage === 'step12') ? (
  
  loggedInUser ? (
    <>
      <div
        onClick={() => {
          Page23();
          console.log('Changing to homepage');
          handlePageChange('homepage');
        }}
        style={dropdownItemStyle}
      >
        Home Page
      </div>
      <div
        onClick={() => {
          Page23();
          console.log('Changing to homepage');
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          handlePageChange('tasks');
        }}
        style={dropdownItemStyle}
      >
        Tasks
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          console.log('Changing to homepage');
          handlePageChange('step0');
        }}
        style={dropdownItemStyle}
      >
        How To Use
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
          setTimerInterval(2000);
          console.log('Changing to homepage');
          handlePageChange('expensesdemo');
        }}
        style={dropdownItemStyle}
      >
        Expense Demo
      </div>
      <div onClick={handleLogout} style={dropdownItemStyle}>
        Logout
      </div>
    </>
  ) : (
    <>
      <div
        onClick={() => {
          Page23();
          console.log('Changing to homepage');
          handlePageChange('homepage');
        }}
        style={dropdownItemStyle}
      >
        Home Page
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          console.log('Changing to homepage');
          handlePageChange('step0');
        }}
        style={dropdownItemStyle}
      >
        How To Use
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
          setTimerInterval(2000);
          console.log('Changing to homepage');
          handlePageChange('expensesdemo');
        }}
        style={dropdownItemStyle}
      >
        Expense Demo
      </div>
      <div
        onClick={() => {
          Page23();
          console.log('Changing to homepage');
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          handlePageChange('tasks');
        }}
        style={dropdownItemStyle}
      >
        Login
      </div>
    </>
  )
  
) : loggedInUser ? (
  
  <>
    <div
      onClick={() => {
        Page23();
        console.log('Changing to homepage');
        handlePageChange('homepage');
      }}
      style={dropdownItemStyle}
    >
      Home Page
    </div>
    <div
      onClick={() => {
        Page23();
        console.log('Changing to homepage');
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
        handlePageChange('tasks');
      }}
      style={dropdownItemStyle}
    >
      Tasks
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentStep(0);
        setTimerInterval(1000);
        console.log('Changing to homepage');
        handlePageChange('step0');
      }}
      style={dropdownItemStyle}
    >
      How To Use
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentPage(1);        
        setIntervalPage(1); // Reset intervalPage to 1
        setTimerInterval(2000);
        console.log('Changing to homepage');
        handlePageChange('expensesdemo');
      }}
      style={dropdownItemStyle}
    >
      Expense Demo
    </div>
    <div onClick={handleLogout} style={dropdownItemStyle}>
      Logout
    </div>
  </>
  
) : (
  
  <>
    <div
      onClick={() => {
        Page23();
        console.log('Changing to homepage');
        handlePageChange('homepage');
      }}
      style={dropdownItemStyle}
    >
      Home Page
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentStep(0);
        setTimerInterval(1000);
        console.log('Changing to homepage');
        handlePageChange('step0');
      }}
      style={dropdownItemStyle}
    >
      How To Use
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentPage(1);        
        setIntervalPage(1); // Reset intervalPage to 1
        setTimerInterval(2000);
        console.log('Changing to homepage');
        handlePageChange('expensesdemo');
      }}
      style={dropdownItemStyle}
    >
      Expense Demo
    </div>
    <div
      onClick={() => {
        Page23();
        console.log('Changing to homepage');
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
        handlePageChange('tasks');
      }}
      style={dropdownItemStyle}
    >
      Login
    </div>
  </>
)}
          </div>
        )}
      </div>
      </div>


      {/* Page Content */}
      <Routes>
        <Route path="/" element={
      <div>
      {activePage === 'tasks' && (
    <div>
      {loggedInUser ? (
<div style={pageStyle2}>  
{<Page22 />}
<Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Enter (Tasks, Participants and Expenses)</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowTaskParticipant(!showTaskParticipant)}
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form onSubmit={handleTaskByTaskSubmit}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskByTask.taskName}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter task name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={taskByTask.measuringUnit}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter measuring unit"
                  required
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={taskByTask.limitValue}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByTaskInputChange({
            target: { name: 'limitValue', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTaskByTask}
              onChange={handleTaskChange}
            >
              <option value="">Select Task</option>
              {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
                <option 
                  key={task.id} 
                  value={task.taskName} 
                  selected={task.current}
                  translate="no"
                >
                  {task.taskName}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowParticipantForm(!showParticipantForm)}
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form onSubmit={handleTaskByUserSubmit}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={taskByUser.userName}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={taskByUser.userEmail}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedTaskByUser}
              onChange={handleUserChange}
            >
              <option value="">Select Participant</option>
              {Array.isArray(tasksByUser) && tasksByUser.map((task) => (
                <option key={task.id} value={task.userEmail} translate="no">
                  {task.userEmail}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form onSubmit={handleTaskByExpenseSubmit}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTaskByTask}
            onChange={handleTaskChange}
          >
            <option value="">Select Task</option>
            {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
              <option 
                key={task.id} 
                value={task.taskName} 
                selected={task.current}
                translate="no"
              >
                {task.taskName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={taskByExpense.expenseDescription}
            onChange={handleTaskByExpenseInputChange}
            placeholder="Enter expense description"
            required
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={taskByExpense.expensePrice}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByExpenseInputChange({
            target: { name: 'expensePrice', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant="primary" type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary" onClick={handleCloseModal}>
    Close
  </Button>
</div>
</Modal.Body>
</Modal>
<Dialog open={openDialog1} onClose={handleCancelDelete1}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the task <b><span translate="no">{selectedTaskByTask}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="primary" onClick={handleCancelDelete1}>
        No
      </Button>
      <Button variant="danger" onClick={handleConfirmDelete1}>
        Yes
      </Button>
    </DialogActions>
</Dialog>
<Dialog open={openDialog2} onClose={handleCancelDelete2}>
    <DialogTitle>Delete Participant</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the participant <b><span translate="no">{selectedTaskByUser}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete2} variant="primary">
        No
      </Button>
      <Button onClick={handleConfirmDelete2} variant="danger" autoFocus>
        Yes
      </Button>
    </DialogActions>
</Dialog>
</div>
      ) : (
<>
<Home />
</>
      )}
    </div>
      )}

      {activePage === 'expensesdemo' && (
         <>
         {currentPage === 1 && <Page1 />}
         {currentPage === 2 && <Page2 />}
         {currentPage === 3 && <Page3 />}
         {currentPage === 4 && <Page4 />}
         {currentPage === 5 && <Page5 />}
         {currentPage === 6 && <Page6 />}
         {currentPage === 7 && <Page7 />}
         {currentPage === 8 && <Page8 />}
         {currentPage === 9 && <Page9 />}
         {currentPage === 10 && <Page10 />}
         {currentPage === 11 && <Page11 />}
         {currentPage === 12 && <Page11a />}
         {currentPage === 13 && <Page12 />}
         {currentPage === 14 && <Page13 />}
         {currentPage === 15 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg" />}
         {currentPage === 16 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 17 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 18 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 19 && <Page15 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 20 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 21 && <Page15 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 22 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 23 && <Page16 saldoValue="&nbsp;" ukupno="25,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 24 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 25 && <Page16 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 26 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 27 && <Page17 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 28 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 29 && <Page17 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 30 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 31 && <Page18 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 32 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 33 && <Page18 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 34 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 35 && <Page19 saldoValue="&nbsp;" ukupno="600,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 36 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 37 && <Page19 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 38 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 39 && <Page20 saldoValue="&nbsp;" ukupno="95,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 40 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 41 && <Page20 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 42 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 43 && <Page21 ukupno="50,00" nabavljenoUkupno="770,00 Kg" nedostaje="230,00 Kg" />}
         </>
      )}

      {(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || activePage === 'step12') && (
<>
<div style={pageStyle2}>  
{<Page24 />}
</div>

<Modal show={showModal} onHide={handleCloseModal} style={modalBottomStyles1} backdrop={false}>
    <Modal.Body>
      <Button 
        variant={isDanger2 ? "success" : "primary"} 
        className="mb-3"
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant={isDanger3 ? "success" : "primary"} 
            className="mb-3"
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskName}
                  placeholder="Enter task name"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={measuringUnit}
                  placeholder="Enter measuring unit"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={limitValue}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
              <Button variant={isDanger4 ? "success" : "primary"} type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTask}
            disabled={true}
            >
              <option value="">Select Task</option>
              <option translate="no">My Task Name Examle</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant={isDanger5 ? "success" : "primary"}  
            className="mb-3"
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
            disabled={true}
                  value={participantName}
                  placeholder="Enter participant name"
                  required
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={participantEmail}
                  placeholder="Enter participant email"
                  required
            disabled={true}
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Button variant={isDanger6 ? "success" : "primary"} type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedParticipant}
            disabled={true}
            >
              <option value="">Select Participant</option>
               <option translate="no">My Participant Name</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTask}
            disabled={true}
style={{
        border: hasError3 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          >
            <option value="">Select Task</option>
            <option translate="no" value="My Task Name Examle">My Task Name Examle</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseDescription}
            placeholder="Enter expense description"
            disabled={true}
            required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={expensePrice}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant={isDanger7 ? "success" : "primary"} type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary">
    Close
  </Button>
</div>
</Modal.Body>
</Modal>

<Modal 
    show={true} 
    style={{ ...modalBottomStyles2, opacity: 0.8 }} 
    backdrop={false}
>
    <Modal.Header 
        style={{ 
            backgroundColor: 'black', // Set background to black
            color: 'white',           // Change text color to white for better contrast
            whiteSpace: 'pre-wrap', 
            fontSize: '12px' 
        }}
    >
        <div>
            {steps[currentStep]}
        </div>
    </Modal.Header>
    <Modal.Footer 
        style={{ 
            backgroundColor: 'black' // Optionally set footer background to black as well
        }}
    >
        <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn btn-secondary btn-sm"
        >
            Previous
        </Button>
        <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="btn btn-primary btn-sm"
        >
            Next
        </Button>
    </Modal.Footer>
</Modal>
</>
)}

      {activePage === 'homepage' && (
         <>
      <div style={styles.app}>
        {/* Hero sekcija */}
        <header style={styles.hero}>
          <h1 style={styles.heroH1}>Welcome to Expense Tracking</h1>
          <p style={styles.heroP}>Track your expenses efficiently, set goals, and stay on budget!</p>
        </header>

        {/* Sekcije sa podacima */}
        <Section2
          title="How to Use Expense Tracking"
          description="Simply sign up, connect your bank accounts, and start tracking your expenses automatically. You can categorize your transactions, set monthly limits, and view reports that give you insight into your spending habits."
          imageUrl={howToUseImage}
        />

        <Section
          title="Free Plan"
          description="The free plan offers basic expense tracking features, including connecting up to 2 bank accounts and tracking your daily transactions. This is perfect for personal budgeting."
          imageUrl={freePlanImage}
          price="$0/month"
          alt
        />

        <Section
          title="Premium Plan"
          description="Our premium plan gives you access to unlimited bank connections, advanced analytics, custom spending reports, and dedicated support. Ideal for small businesses or individuals with multiple accounts."
          imageUrl={premiumPlanImage}
          price="$9.99/month"
        />

        <Section
          title="Enterprise Plan"
          description="For large businesses, we offer an enterprise-level plan with complete integration with your accounting systems, advanced team management features, and personalized training."
          imageUrl={enterprisePlanImage}
          price="$49.99/month"
          alt
        />

        <footer style={styles.footer}>
          <p>&copy; 2024 Expense Tracking. All rights reserved.</p>
        </footer>
      </div>
         </>
      )}
      </div>} />



        <Route path="/Home" element={
      <div>
      {activePage === 'tasks' && (
    <div>
      {loggedInUser ? (
<div style={pageStyle2}>  
{<Page22 />}
<Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Enter (Tasks, Participants and Expenses)</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowTaskParticipant(!showTaskParticipant)}
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form onSubmit={handleTaskByTaskSubmit}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskByTask.taskName}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter task name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={taskByTask.measuringUnit}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter measuring unit"
                  required
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={taskByTask.limitValue}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByTaskInputChange({
            target: { name: 'limitValue', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTaskByTask}
              onChange={handleTaskChange}
            >
              <option value="">Select Task</option>
              {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
                <option 
                  key={task.id} 
                  value={task.taskName} 
                  selected={task.current}
                  translate="no"
                >
                  {task.taskName}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowParticipantForm(!showParticipantForm)}
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form onSubmit={handleTaskByUserSubmit}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={taskByUser.userName}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={taskByUser.userEmail}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedTaskByUser}
              onChange={handleUserChange}
            >
              <option value="">Select Participant</option>
              {Array.isArray(tasksByUser) && tasksByUser.map((task) => (
                <option key={task.id} value={task.userEmail} translate="no">
                  {task.userEmail}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form onSubmit={handleTaskByExpenseSubmit}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTaskByTask}
            onChange={handleTaskChange}
          >
            <option value="">Select Task</option>
            {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
              <option 
                key={task.id} 
                value={task.taskName} 
                selected={task.current}
                translate="no"
              >
                {task.taskName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={taskByExpense.expenseDescription}
            onChange={handleTaskByExpenseInputChange}
            placeholder="Enter expense description"
            required
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={taskByExpense.expensePrice}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByExpenseInputChange({
            target: { name: 'expensePrice', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant="primary" type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary" onClick={handleCloseModal}>
    Close
  </Button>
</div>
</Modal.Body>
</Modal>
<Dialog open={openDialog1} onClose={handleCancelDelete1}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the task <b><span translate="no">{selectedTaskByTask}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="primary" onClick={handleCancelDelete1}>
        No
      </Button>
      <Button variant="danger" onClick={handleConfirmDelete1}>
        Yes
      </Button>
    </DialogActions>
</Dialog>
<Dialog open={openDialog2} onClose={handleCancelDelete2}>
    <DialogTitle>Delete Participant</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the participant <b><span translate="no">{selectedTaskByUser}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete2} variant="primary">
        No
      </Button>
      <Button onClick={handleConfirmDelete2} variant="danger" autoFocus>
        Yes
      </Button>
    </DialogActions>
</Dialog>
</div>
      ) : (
<>
<Home />
</>
      )}
    </div>
      )}

      {activePage === 'expensesdemo' && (
         <>
         {currentPage === 1 && <Page1 />}
         {currentPage === 2 && <Page2 />}
         {currentPage === 3 && <Page3 />}
         {currentPage === 4 && <Page4 />}
         {currentPage === 5 && <Page5 />}
         {currentPage === 6 && <Page6 />}
         {currentPage === 7 && <Page7 />}
         {currentPage === 8 && <Page8 />}
         {currentPage === 9 && <Page9 />}
         {currentPage === 10 && <Page10 />}
         {currentPage === 11 && <Page11 />}
         {currentPage === 12 && <Page11a />}
         {currentPage === 13 && <Page12 />}
         {currentPage === 14 && <Page13 />}
         {currentPage === 15 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg" />}
         {currentPage === 16 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 17 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 18 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 19 && <Page15 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 20 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 21 && <Page15 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 22 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 23 && <Page16 saldoValue="&nbsp;" ukupno="25,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 24 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 25 && <Page16 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 26 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 27 && <Page17 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 28 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 29 && <Page17 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 30 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 31 && <Page18 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 32 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 33 && <Page18 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 34 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 35 && <Page19 saldoValue="&nbsp;" ukupno="600,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 36 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 37 && <Page19 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 38 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 39 && <Page20 saldoValue="&nbsp;" ukupno="95,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 40 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 41 && <Page20 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 42 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 43 && <Page21 ukupno="50,00" nabavljenoUkupno="770,00 Kg" nedostaje="230,00 Kg" />}
         </>
      )}

      {(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || activePage === 'step12') && (
<>
<div style={pageStyle2}>  
{<Page24 />}
</div>

<Modal show={showModal} onHide={handleCloseModal} style={modalBottomStyles1} backdrop={false}>
    <Modal.Body>
      <Button 
        variant={isDanger2 ? "success" : "primary"} 
        className="mb-3"
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant={isDanger3 ? "success" : "primary"} 
            className="mb-3"
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskName}
                  placeholder="Enter task name"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={measuringUnit}
                  placeholder="Enter measuring unit"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={limitValue}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
              <Button variant={isDanger4 ? "success" : "primary"} type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTask}
            disabled={true}
            >
              <option value="">Select Task</option>
              <option translate="no">My Task Name Examle</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant={isDanger5 ? "success" : "primary"}  
            className="mb-3"
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
            disabled={true}
                  value={participantName}
                  placeholder="Enter participant name"
                  required
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={participantEmail}
                  placeholder="Enter participant email"
                  required
            disabled={true}
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Button variant={isDanger6 ? "success" : "primary"} type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedParticipant}
            disabled={true}
            >
              <option value="">Select Participant</option>
               <option translate="no">My Participant Name</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTask}
            disabled={true}
style={{
        border: hasError3 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          >
            <option value="">Select Task</option>
            <option translate="no" value="My Task Name Examle">My Task Name Examle</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseDescription}
            placeholder="Enter expense description"
            disabled={true}
            required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={expensePrice}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant={isDanger7 ? "success" : "primary"} type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary">
    Close
  </Button>
</div>
</Modal.Body>
</Modal>

<Modal 
    show={true} 
    style={{ ...modalBottomStyles2, opacity: 0.8 }} 
    backdrop={false}
>
    <Modal.Header 
        style={{ 
            backgroundColor: 'black', // Set background to black
            color: 'white',           // Change text color to white for better contrast
            whiteSpace: 'pre-wrap', 
            fontSize: '12px' 
        }}
    >
        <div>
            {steps[currentStep]}
        </div>
    </Modal.Header>
    <Modal.Footer 
        style={{ 
            backgroundColor: 'black' // Optionally set footer background to black as well
        }}
    >
        <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn btn-secondary btn-sm"
        >
            Previous
        </Button>
        <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="btn btn-primary btn-sm"
        >
            Next
        </Button>
    </Modal.Footer>
</Modal>
</>
)}

      {activePage === 'homepage' && (
         <>
      <div style={styles.app}>
        {/* Hero sekcija */}
        <header style={styles.hero}>
          <h1 style={styles.heroH1}>Welcome to Expense Tracking</h1>
          <p style={styles.heroP}>Track your expenses efficiently, set goals, and stay on budget!</p>
        </header>

        {/* Sekcije sa podacima */}
        <Section2
          title="How to Use Expense Tracking"
          description="Simply sign up, connect your bank accounts, and start tracking your expenses automatically. You can categorize your transactions, set monthly limits, and view reports that give you insight into your spending habits."
          imageUrl={howToUseImage}
        />

        <Section
          title="Free Plan"
          description="The free plan offers basic expense tracking features, including connecting up to 2 bank accounts and tracking your daily transactions. This is perfect for personal budgeting."
          imageUrl={freePlanImage}
          price="$0/month"
          alt
        />

        <Section
          title="Premium Plan"
          description="Our premium plan gives you access to unlimited bank connections, advanced analytics, custom spending reports, and dedicated support. Ideal for small businesses or individuals with multiple accounts."
          imageUrl={premiumPlanImage}
          price="$9.99/month"
        />

        <Section
          title="Enterprise Plan"
          description="For large businesses, we offer an enterprise-level plan with complete integration with your accounting systems, advanced team management features, and personalized training."
          imageUrl={enterprisePlanImage}
          price="$49.99/month"
          alt
        />

        <footer style={styles.footer}>
          <p>&copy; 2024 Expense Tracking. All rights reserved.</p>
        </footer>
      </div>
         </>
      )}
      </div>} />

        <Route path="/Registering" element={<Registration />} />
        <Route path="/SetNewPassword" element={<SetNewPassword />} />
        <Route path="/VerifyingEmail" element={<VerifyingEmail />} />
        <Route path="/RequestPasswordReset" element={<RequestPasswordReset />} />
        <Route path="/ResendVerificationEmail" element={<ResendVerificationEmail />} />
      </Routes>
    </div>
      <style>
        {`
          .table-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
          }

          .table.rounded-corners {
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 20px;
          }

          .table.rounded-corners th, .table.rounded-corners td {
            border: 10;
            box-shadow: 0 0 0 1px black;
            color: black;
          }

table.rounded-corners thead tr:first-child th:first-child {
 border-top-left-radius: 10px;
}

table.rounded-corners thead tr:last-child th:first-child {
 border-bottom-left-radius: 10px;
}

table.rounded-corners thead tr:first-child th:last-child {
 border-top-right-radius: 10px;
}

table.rounded-corners thead tr:last-child th:last-child {
 border-bottom-right-radius: 10px;
}

table.rounded-corners tbody tr:first-child td:first-child {
 border-top-left-radius: 10px;
}

table.rounded-corners tbody tr:last-child td:first-child {
 border-bottom-left-radius: 10px;
}

table.rounded-corners tbody tr:first-child td:last-child {
 border-top-right-radius: 10px;
}

table.rounded-corners tbody tr:last-child td:last-child {
 border-bottom-right-radius: 10px;
}
        `}
      </style>
      </>
  );
}

const headerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  padding: '40px', // Adjusted padding to fit content better
  zIndex: 3,
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const contentStyle = {
  marginTop: '80px', // Space for header
  padding: '0px',
  width: '100%',
  boxSizing: 'border-box',
  height: 'calc(100vh - 80px)', // Adjust height to fit within viewport
  overflow: 'auto', // Enable both vertical and horizontal scrolling
};

const lineStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: 'black',
  margin: '4px 0',
};

const dropdownItemStyle = {
  display: 'block',
  padding: '10px',
  textDecoration: 'none',
  color: 'black',
  backgroundColor: 'white',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
};

const container = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
  // Base styles for mobile first
  maxWidth: '100%', 
};

export default App;
