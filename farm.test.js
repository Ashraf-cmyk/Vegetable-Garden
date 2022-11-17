const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
  getYieldForPlantWith,
  getYieldForPlantWithMore,
  getYieldForCropWithMore,
  getTotalYieldWithMore,
  getRevenueForCropWithMore,
  getProfitForCropWithMore,
  getTotalProfitWithMore,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

//no environmental factors

describe("getCostsForCrop", () => {
  test("Get cost for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 5,
    };
    expect(getCostsForCrop(input)).toBe(50);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 5,
      salesPrice: 7,
    };
    expect(getRevenueForCrop(input)).toBe(210);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 5,
      salesPrice: 7,
    };
    expect(getProfitForCrop(input)).toBe(160);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 10, cost: 5, salesPrice: 7 },
      { crop: pumpkin, numCrops: 2, cost: 3, salesPrice: 10 },
    ];
    expect(getTotalProfit({ crops })).toBe(234);
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0, cost: 0, salesPrice: 0 }];
    expect(getTotalProfit({ crops })).toBe(0);
  });
});

//including environmental factors

describe("getYieldForPlantWith", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
  };

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlantWith(corn, environmentFactors)).toBe(15);
  });
});

describe("getYieldForPlantWithMore", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        lots: -60,
        medium: -30,
        little: 0,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "little",
  };

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlantWithMore(corn, environmentFactors)).toBe(45);
  });
});

describe("getYieldForCropWithMore", () => {
  test("Get yield for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "little",
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCropWithMore(input, environmentFactors)).toBe(45);
  });
});

describe("getTotalYieldWithMore", () => {
  test("Calculate total yield with multiple crops and environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -30,
          medium: 0,
          high: 70,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "high",
      wind: "medium",
    };
    expect(getTotalYieldWithMore({ crops }, environmentFactors)).toBe(29.35);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {},
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    const environmentFactors = {};
    expect(getTotalYieldWithMore({ crops }, environmentFactors)).toBe(0);
  });
});

describe("getRevenueForCropWithMore", () => {
  test("Get revenue for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "little",
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 5,
      salesPrice: 7,
    };
    expect(getRevenueForCropWithMore(input, environmentFactors)).toBe(315);
  });
});

describe("getProfitForCropWithMore", () => {
  test("Get profit for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "little",
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 5,
      salesPrice: 7,
    };
    expect(getProfitForCropWithMore(input, environmentFactors)).toBe(265);
  });
});

describe("getTotalProfitWithMore", () => {
  test("Calculate total profit with multiple crops and environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -30,
          medium: 0,
          high: 70,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10, cost: 5, salesPrice: 7 },
      { crop: pumpkin, numCrops: 2, cost: 3, salesPrice: 10 },
    ];
    const environmentFactors = {
      sun: "high",
      wind: "medium",
    };
    expect(getTotalProfitWithMore({ crops }, environmentFactors)).toBe(300.5);
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {},
    };
    const crops = [{ crop: corn, numCrops: 0, cost: 0, salesPrice: 0 }];
    const environmentFactors = {};
    expect(getTotalProfitWithMore({ crops }, environmentFactors)).toBe(0);
  });
});
