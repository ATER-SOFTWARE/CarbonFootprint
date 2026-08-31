def calculate_carbon_footprint(
    electricity=0,
    transport=0,
    gas=0,
    water=0
):
    electricity = float(electricity or 0)
    transport = float(transport or 0)
    gas = float(gas or 0)
    water = float(water or 0)

    electricity_emission = electricity * 0.43
    transport_emission = transport * 0.21
    gas_emission = gas * 2.02
    water_emission = water * 0.34

    total = (
        electricity_emission
        + transport_emission
        + gas_emission
        + water_emission
    )

    return {
        "electricity": round(electricity_emission, 2),
        "transport": round(transport_emission, 2),
        "gas": round(gas_emission, 2),
        "water": round(water_emission, 2),
        "total": round(total, 2)
    }