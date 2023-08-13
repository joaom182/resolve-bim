"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader } from "react-feather";
import SearchBar from "./search-bar";

const query = gql`
  query EntityDetails($entityId: Int!, $bimId: Int!) {
    entity(id: $entityId, bimId: $bimId) {
      entityId
      name
      properties
      __typename
    }
  }
`;

function NotFound() {
  return (
    <div className={"text-center py-24"}>
      <AlertTriangle size={48} className="text-slate-12 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-slate-11 p-0 m-0">
        Entity not found
      </h2>
      <p className="text-slate-12">Search for another entity id</p>
    </div>
  );
}

function Loading() {
  return (
    <div className={"py-24"}>
      <Loader size={32} className="animate-spin mx-auto text-slate-12" />
    </div>
  );
}

export default function EntityInspector() {
  const [entityId, setEntityId] = useState<number>();
  const [entity, setEntity] = useState<any>();

  const { data, error, loading } = useQuery<any>(query, {
    skip: !entityId,
    variables: {
      bimId: 1,
      entityId,
    },
  });

  const categories = useMemo(() => {
    if (!entity) return [];
    return Object.keys(entity?.properties).filter((category) => !!category);
  }, [entity]);

  const attributes = useCallback(
    (category: string) => {
      return Object.keys(entity?.properties[category])
        .filter((key) => !!key && !!entity?.properties[category][key])
        .map((key) => (
          <tr key={key}>
            <td className="w-1/2 p-1 text-slate-12">{key}</td>
            <td className="w-1/2 p-1 text-slate-11">
              {entity?.properties[category][key]}
            </td>
          </tr>
        ));
    },
    [entity]
  );

  useEffect(() => {
    setEntity(data?.entity);
  }, [data]);

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="border-b border-b-slate-6">
        <SearchBar
          onReset={() => {
            setEntity(null);
            setEntityId(null);
          }}
          onSearch={(entityId) => setEntityId(entityId)}
        />
      </div>
      <div className="relative bg-slate-3">
        {!!entityId && loading && <Loading />}
        {!!entityId && !loading && !entity && <NotFound />}
        {!loading && !error && !!entity && (
          <>
            <div className="sticky top-0 bg-slate-3 px-6 py-4">
              <h2 className="text-xl font-semibold text-slate-11 p-0 m-0">
                {entity?.name}
              </h2>
            </div>
            <div className="px-6 pb-8">
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category) => {
                  const attributesElements = attributes(category);
                  if (!attributesElements.length) return null;
                  return (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger>{category}</AccordionTrigger>
                      <AccordionContent>
                        <table className="w-full">
                          <tbody>{attributesElements}</tbody>
                        </table>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </>
        )}
      </div>
    </div>
  );
}