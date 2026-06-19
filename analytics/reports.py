import pandas as pd
import matplotlib.pyplot as plt

# Read asset data
df = pd.read_csv("../data/assets.csv")

# Calculate total asset cost department-wise
department_cost = df.groupby("Department")["Cost"].sum()

# Create Pie Chart
plt.figure(figsize=(7, 7))

plt.pie(
    department_cost,
    labels=department_cost.index,
    autopct="%1.1f%%"
)

plt.title("Asset Distribution by Department")

# Save chart
plt.savefig("../charts/pie_chart.png")

# Display chart
plt.show()
plt.figure(figsize=(8, 5))

department_cost.plot(kind="bar")

plt.title("Department-wise Asset Value")

plt.xlabel("Department")
plt.ylabel("Total Asset Cost")

plt.savefig("../charts/bar_chart.png")

plt.show()