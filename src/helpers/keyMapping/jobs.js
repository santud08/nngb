export const jobs = async (key = null) => {
  const listArr = {
    aff: "농업 / 임업 / 어업",
    po: "공무원 (공기업 포함)",
    ti: "교사 / 학원 강사", //teacher/instructor
    p: "전문직", //Profession
    mp: "관리직",
    dj: "사무직",
    ptl: "생산 / 기술 / 노동 직무", //Production/technology/labor
    sssp: "서비스 / 영업 / 판매 직무", //Service/sales/sales positions
    se: "경영주", //Self-employment
    ff: "프리랜서", //
    s: "학생", //Students (elementary, middle and high school students, college students, graduate students)
    i: "무직", //inoccupation
    etc: "기타", //etc
  };

  if (key) {
    let retStr = "";
    if (listArr[key]) {
      retStr = listArr[key];
    }
    return retStr;
  } else {
    return listArr;
  }
};
