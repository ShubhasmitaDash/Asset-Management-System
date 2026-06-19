import pandas as pd
import numpy as np
from datetime import datetime

# Load data
df = pd.read_csv("../data/assets.csv")

current_year = datetime.now().year

# Years used
df["Years_Used"] = current_year - df["Purchase_Year"]

# Annual depreciation
df["Annual_Depreciation"] = (
    
    df["Cost"] / df["Useful_Life"]
)

# Total depreciation
df["Accumulated_Depreciation"] = np.minimum(
    df["Years_Used"],
    df["Useful_Life"]
) * df["Annual_Depreciation"]

# Current value
df["Current_Value"] = (
    df["Cost"] -
    df["Accumulated_Depreciation"]
)

print(df)

# Save report
df.to_csv("../data/depreciation_report.csv",
          index=False)